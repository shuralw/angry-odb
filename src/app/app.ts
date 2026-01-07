import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly gridSize = 9;
  protected readonly rows = Array.from({ length: this.gridSize });
  protected readonly cols = Array.from({ length: this.gridSize });
  protected readonly imageSrc = '/odb_default.png';
  protected readonly angryImageSrc = '/odb_angry.png';

  private readonly overlayVisible = signal(false);

  private readonly specialIndex = Math.floor(Math.random() * this.gridSize * this.gridSize);
  protected readonly specialCoord = {
    row: Math.floor(this.specialIndex / this.gridSize),
    col: this.specialIndex % this.gridSize
  };

  private readonly revealed = signal<Set<string>>(new Set());

  protected reveal(row: number, col: number): void {
    const key = `${row}-${col}`;
    if (this.revealed().has(key)) return;
    const next = new Set(this.revealed());
    next.add(key);
    this.revealed.set(next);

    if (this.isSpecial(row, col)) {
      this.overlayVisible.set(true);
    }
  }

  protected isSpecial(row: number, col: number): boolean {
    return row === this.specialCoord.row && col === this.specialCoord.col;
  }

  protected isRevealed(row: number, col: number): boolean {
    return this.revealed().has(`${row}-${col}`);
  }

  protected imageFor(row: number, col: number): string {
    const specialRevealed = this.isSpecial(row, col) && this.isRevealed(row, col);
    return specialRevealed ? this.angryImageSrc : this.imageSrc;
  }

  protected overlayShown(): boolean {
    return this.overlayVisible();
  }

  public constructor() {
    console.log(`Special tile at row ${this.specialCoord.row}, col ${this.specialCoord.col}`);
  }
}

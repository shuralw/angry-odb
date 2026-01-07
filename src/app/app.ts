import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly imageSrc = 'odb_default.png';
  protected readonly angryImageSrc = 'odb_angry.png';

  private readonly selectedGridSize = signal<number | null>(null);
  private readonly gridSize = signal(0);
  protected readonly rows = signal<number[]>([]);
  protected readonly cols = signal<number[]>([]);
  private readonly overlayVisible = signal(false);

  protected readonly specialCoord = signal<{ row: number; col: number } | null>(null);

  protected startGame(size: number): void {
    this.selectedGridSize.set(size);
    this.gridSize.set(size);
    this.rows.set(Array.from({ length: size }));
    this.cols.set(Array.from({ length: size }));

    const specialIndex = Math.floor(Math.random() * size * size);
    const coord = {
      row: Math.floor(specialIndex / size),
      col: specialIndex % size
    };
    this.specialCoord.set(coord);
    console.log(`Special tile at row ${coord.row}, col ${coord.col}`);
  }

  protected isGameStarted(): boolean {
    return this.selectedGridSize() !== null;
  }

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
    const coord = this.specialCoord();
    return coord !== null && row === coord.row && col === coord.col;
  }

  protected isRevealed(row: number, col: number): boolean {
    return this.revealed().has(`${row}-${col}`);
  }

  protected overlayShown(): boolean {
    return this.overlayVisible();
  }


}

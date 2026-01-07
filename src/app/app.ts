import { Component } from '@angular/core';

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
  protected readonly imageSrc = '/odb_default_v5.png';
}

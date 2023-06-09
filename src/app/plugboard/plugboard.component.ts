import { AfterViewInit, Component, Input } from '@angular/core';
import { Row1, Row2, Row3, Letters, map } from '../board';

@Component({
  selector: 'app-plugboard',
  templateUrl: './plugboard.component.html',
  styleUrls: ['./plugboard.component.css']
})
export class PlugboardComponent implements AfterViewInit {
  readonly letters: string[] = Array.from(Letters);
  readonly row1 = Array.from(Row1);
  readonly row2 = Array.from(Row2);
  readonly row3 = Array.from(Row3);
  readonly plugDefaults: string[] = this.row1.concat(this.row2, this.row3);

  plugsSelected: string[] = Array.from(this.plugDefaults);
  previousPlugs: string[] = Array.from(this.plugsSelected);
  @Input() plugboardMap: map = {};
  previousMap: map = {};

  constructor() {
    this.initPlugboardMap();
  }
  ngAfterViewInit(): void {
    this.initPlugboardMap();
  }

  initPlugboardMap(): void {
    this.plugDefaults.forEach(element => {
      this.plugboardMap[element] = element;
      this.previousMap[element] = element;
    });
  }

  onChange(x: string) {
    let previous = this.previousMap[x];

    if (x !== previous) {
      this.plugboardMap[previous] = previous;
      this.previousMap[previous] = previous;
    }

    let connected: string = this.plugboardMap[x];

    let connectedPrevious = this.previousMap[connected];

    this.plugboardMap[connectedPrevious] = connectedPrevious;
    this.previousMap[connectedPrevious] = connectedPrevious;

    this.plugboardMap[connected] = x;
    this.previousMap[x] = this.plugboardMap[x];
  }

  isConnected(plug: string): boolean {
    return this.plugboardMap[plug] !== plug;
  }

  toDisable(x: string): boolean {
    let difCount = this.letters.filter(x => this.plugboardMap[x] !== x).length;
    return difCount === 10 && this.plugboardMap[x] === x;
  }
}


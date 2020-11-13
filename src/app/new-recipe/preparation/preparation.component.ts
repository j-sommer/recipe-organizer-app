import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent {
  @Input()
  public preparation: string;

  @Output()
  public preparationChange = new EventEmitter<string>();

  public onChange(val: string): void {
    this.preparation = val;
    this.preparationChange.emit(this.preparation);
  }
}

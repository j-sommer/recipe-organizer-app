import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss'],
})
export class FormHeaderComponent {
  @Input()
  public heading: string;

  @Input()
  public infoText: string;

  @Input()
  public additionalActions: boolean;

  @Output()
  public additionalActionsClick = new EventEmitter<Event>();
}

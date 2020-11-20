import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initial-message',
  templateUrl: './initial-message.component.html',
  styleUrls: ['./initial-message.component.scss'],
})
export class InitialMessageComponent {
  @Input()
  public show = false;
}

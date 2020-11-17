import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-placeholder',
  templateUrl: './list-placeholder.component.html',
  styleUrls: ['./list-placeholder.component.scss'],
})
export class ListPlaceholderComponent {
  @Input()
  public isLoading = true;
}

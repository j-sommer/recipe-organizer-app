import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-view-toolbar',
  templateUrl: './recipe-view-toolbar.component.html',
  styleUrls: ['./recipe-view-toolbar.component.scss'],
  animations: [
    trigger('searchBar', [
      transition(':enter', [
        style({
          width: '0%',
        }),
        animate('150ms', style({ width: '100%' })),
      ]),
      transition(':leave', [animate('150ms', style({ width: '0%' }))]),
    ]),
    trigger('title', [
      transition(':enter', [
        style({
          width: '0%',
          opacity: '0%',
        }),
        animate('200ms', style({ width: '100%', opacity: '100%' })),
      ]),
      transition(':leave', [animate('150ms', style({ width: '0%' }))]),
    ]),
  ],
})
export class RecipeViewToolbarComponent {
  @Input()
  public title: string;

  @Input()
  public isLoading = true;

  @Output()
  public searchChange = new EventEmitter<Event>();

  @Output()
  public startSearch = new EventEmitter<boolean>();

  public isSearching = false;

  public onSearchClick(): void {
    if (this.isSearching) {
      this.startSearch.emit(false);
      this.isSearching = false;
    } else {
      this.startSearch.emit(true);
      this.isSearching = true;
    }
  }

  public cancelSearch(): void {
    this.startSearch.emit(false);
    this.isSearching = false;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ingredient-menu',
  templateUrl: './ingredient-menu.component.html',
  styleUrls: ['./ingredient-menu.component.scss'],
})
export class IngredientMenuComponent {
  @Output()
  public addNewGroup = new EventEmitter<void>();
}

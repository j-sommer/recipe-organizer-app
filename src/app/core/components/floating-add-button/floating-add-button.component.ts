import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { destinations } from 'src/app/app-routing.module';

@Component({
  selector: 'app-floating-add-button',
  templateUrl: './floating-add-button.component.html',
  styleUrls: ['./floating-add-button.component.scss'],
})
export class FloatingAddButtonComponent {
  constructor(private router: Router) {}

  public onAddClick(): void {
    this.router.navigate([destinations.recipeForm]);
  }
}

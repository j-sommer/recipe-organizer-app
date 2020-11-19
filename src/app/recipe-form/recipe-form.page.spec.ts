import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeFormPage } from './recipe-form.page';

describe('RecipeFormPage', () => {
  let component: RecipeFormPage;
  let fixture: ComponentFixture<RecipeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

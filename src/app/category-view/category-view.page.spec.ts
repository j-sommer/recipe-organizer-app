import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryViewPage } from './category-view.page';

describe('CategoryViewPage', () => {
  let component: CategoryViewPage;
  let fixture: ComponentFixture<CategoryViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadViewPage } from './read-view.page';

describe('ReadViewPage', () => {
  let component: ReadViewPage;
  let fixture: ComponentFixture<ReadViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

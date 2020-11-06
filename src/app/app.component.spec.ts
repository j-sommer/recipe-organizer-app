import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

jest.mock('@ionic/angular');
jest.mock('@ionic-native/splash-screen/ngx');
jest.mock('@ionic-native/status-bar/ngx');

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  test.skip('should exist', () => {
    // Then
    expect(component).toBeTruthy();
  });
});

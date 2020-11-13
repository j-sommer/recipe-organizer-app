import { TestBed } from '@angular/core/testing';

import { RecipeViewService } from './recipe-view.service';

describe('RecipeViewService', () => {
  let service: RecipeViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

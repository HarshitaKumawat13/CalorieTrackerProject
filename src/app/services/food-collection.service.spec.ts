import { TestBed } from '@angular/core/testing';

import { FoodCollectionService } from './food-collection.service';

describe('FoodCollectionService', () => {
  let service: FoodCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

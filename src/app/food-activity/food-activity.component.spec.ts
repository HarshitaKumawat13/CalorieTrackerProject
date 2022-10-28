import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodActivityComponent } from './food-activity.component';

describe('FoodActivityComponent', () => {
  let component: FoodActivityComponent;
  let fixture: ComponentFixture<FoodActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

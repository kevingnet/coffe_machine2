import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCoffeeComponent } from './fill-coffee.component';

describe('FillCoffeeComponent', () => {
  let component: FillCoffeeComponent;
  let fixture: ComponentFixture<FillCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

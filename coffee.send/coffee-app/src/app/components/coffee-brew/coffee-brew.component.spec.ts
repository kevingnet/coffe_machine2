import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeBrewComponent } from './coffee-brew.component';

describe('CoffeeBrewComponent', () => {
  let component: CoffeeBrewComponent;
  let fixture: ComponentFixture<CoffeeBrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeBrewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeBrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

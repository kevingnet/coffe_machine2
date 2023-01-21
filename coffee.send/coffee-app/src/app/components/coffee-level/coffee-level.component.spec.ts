import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeLevelComponent } from './coffee-level.component';

describe('CoffeeLevelComponent', () => {
  let component: CoffeeLevelComponent;
  let fixture: ComponentFixture<CoffeeLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

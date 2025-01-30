import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFormBackgroundComponent } from './insert-form-background.component';

describe('InsertFormBackgroundComponent', () => {
  let component: InsertFormBackgroundComponent;
  let fixture: ComponentFixture<InsertFormBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertFormBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertFormBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablebackgroundComponent } from './tablebackground.component';

describe('TablebackgroundComponent', () => {
  let component: TablebackgroundComponent;
  let fixture: ComponentFixture<TablebackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablebackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablebackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

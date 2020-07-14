import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBPComponent } from './add-bp.component';

describe('AddBPComponent', () => {
  let component: AddBPComponent;
  let fixture: ComponentFixture<AddBPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

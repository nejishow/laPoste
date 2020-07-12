import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBpComponent } from './all-bp.component';

describe('AllBpComponent', () => {
  let component: AllBpComponent;
  let fixture: ComponentFixture<AllBpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

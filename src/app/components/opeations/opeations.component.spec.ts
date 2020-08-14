import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeationsComponent } from './opeations.component';

describe('OpeationsComponent', () => {
  let component: OpeationsComponent;
  let fixture: ComponentFixture<OpeationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

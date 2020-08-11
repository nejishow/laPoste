import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedClientsComponent } from './red-clients.component';

describe('RedClientsComponent', () => {
  let component: RedClientsComponent;
  let fixture: ComponentFixture<RedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

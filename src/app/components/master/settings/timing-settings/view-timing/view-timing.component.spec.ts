import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimingComponent } from './view-timing.component';

describe('ViewTimingComponent', () => {
  let component: ViewTimingComponent;
  let fixture: ComponentFixture<ViewTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

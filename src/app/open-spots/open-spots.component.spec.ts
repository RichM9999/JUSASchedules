import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSpotsComponent } from './open-spots.component';

describe('OpenSpotsComponent', () => {
  let component: OpenSpotsComponent;
  let fixture: ComponentFixture<OpenSpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSpotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

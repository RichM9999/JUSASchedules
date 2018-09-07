import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNextGamesComponent } from './my-next-games.component';

describe('MyNextGamesComponent', () => {
  let component: MyNextGamesComponent;
  let fixture: ComponentFixture<MyNextGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNextGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNextGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

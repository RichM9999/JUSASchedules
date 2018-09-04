import { TestBed, async } from '@angular/core/testing';
import { GameScheduleComponent } from './gameSchedule.component';
describe('GameScheduleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameScheduleComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(GameScheduleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'JUSA Referee Schedules'`, async(() => {
    const fixture = TestBed.createComponent(GameScheduleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('newui');
  }));
});

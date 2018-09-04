import { TestBed, inject } from '@angular/core/testing';

import { GameTimeDataService } from './gameTime-data.service';

describe('GameTimeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTimeDataService]
    });
  });

  it('should be created', inject([GameTimeDataService], (service: GameTimeDataService) => {
    expect(service).toBeTruthy();
  }));
});

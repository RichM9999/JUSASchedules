import { TestBed, inject } from '@angular/core/testing';

import { GameRefereeDataService } from './gameReferee-data.service';

describe('GameRefereeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRefereeDataService]
    });
  });

  it('should be created', inject([GameRefereeDataService], (service: GameRefereeDataService) => {
    expect(service).toBeTruthy();
  }));
});

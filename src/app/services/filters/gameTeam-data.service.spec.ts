import { TestBed, inject } from '@angular/core/testing';

import { GameTeamDataService } from './gameTeam-data.service';

describe('GameTeamDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTeamDataService]
    });
  });

  it('should be created', inject([GameTeamDataService], (service: GameTeamDataService) => {
    expect(service).toBeTruthy();
  }));
});

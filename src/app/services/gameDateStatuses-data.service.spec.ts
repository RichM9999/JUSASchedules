import { TestBed, inject } from '@angular/core/testing';

import { GameDateStatusesDataService } from './gameDateStatuses-data.service';

describe('MyNextGamesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDateStatusesDataService]
    });
  });

  it('should be created', inject([GameDateStatusesDataService], (service: GameDateStatusesDataService) => {
    expect(service).toBeTruthy();
  }));
});

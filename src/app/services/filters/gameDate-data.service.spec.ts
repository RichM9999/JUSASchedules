import { TestBed, inject } from '@angular/core/testing';

import { GameDateDataService } from './gameDate-data.service';

describe('GameDateDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDateDataService]
    });
  });

  it('should be created', inject([GameDateDataService], (service: GameDateDataService) => {
    expect(service).toBeTruthy();
  }));
});

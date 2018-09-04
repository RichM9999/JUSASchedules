import { TestBed, inject } from '@angular/core/testing';

import { GameTypeDataService } from './gameType-data.service';

describe('GameTypeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameTypeDataService]
    });
  });

  it('should be created', inject([GameTypeDataService], (service: GameTypeDataService) => {
    expect(service).toBeTruthy();
  }));
});

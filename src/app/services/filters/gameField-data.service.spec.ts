import { TestBed, inject } from '@angular/core/testing';

import { GameFieldDataService } from './gameField-data.service';

describe('GameFieldDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameFieldDataService]
    });
  });

  it('should be created', inject([GameFieldDataService], (service: GameFieldDataService) => {
    expect(service).toBeTruthy();
  }));
});

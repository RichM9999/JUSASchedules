import { TestBed, inject } from '@angular/core/testing';

import { GameDivisionDataService } from './gameDivision-data.service';

describe('GameDivisionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDivisionDataService]
    });
  });

  it('should be created', inject([GameDivisionDataService], (service: GameDivisionDataService) => {
    expect(service).toBeTruthy();
  }));
});

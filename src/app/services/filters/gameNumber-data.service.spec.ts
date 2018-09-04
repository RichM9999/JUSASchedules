import { TestBed, inject } from '@angular/core/testing';

import { GameNumberDataService } from './gameNumber-data.service';

describe('GameNumberDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameNumberDataService]
    });
  });

  it('should be created', inject([GameNumberDataService], (service: GameNumberDataService) => {
    expect(service).toBeTruthy();
  }));
});

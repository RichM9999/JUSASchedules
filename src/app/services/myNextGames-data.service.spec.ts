import { TestBed, inject } from '@angular/core/testing';

import { MyNextGamesDataService } from './myNextGames-data.service';

describe('MyNextGamesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyNextGamesDataService]
    });
  });

  it('should be created', inject([MyNextGamesDataService], (service: MyNextGamesDataService) => {
    expect(service).toBeTruthy();
  }));
});

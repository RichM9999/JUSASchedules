import { TestBed, inject } from '@angular/core/testing';

import { GameAssignService } from "./game-assign.service";

describe('GameAssignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameAssignService]
    });
  });

  it('should be created', inject([GameAssignService], (service: GameAssignService) => {
    expect(service).toBeTruthy();
  }));
});

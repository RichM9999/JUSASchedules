import { TestBed, inject } from '@angular/core/testing';

import { GameConfirmService } from "./game-confirm.service";

describe('GameConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameConfirmService]
    });
  });

  it('should be created', inject([GameConfirmService], (service: GameConfirmService) => {
    expect(service).toBeTruthy();
  }));
});

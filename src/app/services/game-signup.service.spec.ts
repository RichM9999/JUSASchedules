import { TestBed, inject } from '@angular/core/testing';

import { GameSignupService } from "./game-signup.service";

describe('GameSignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameSignupService]
    });
  });

  it('should be created', inject([GameSignupService], (service: GameSignupService) => {
    expect(service).toBeTruthy();
  }));
});

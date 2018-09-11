import { TestBed, inject } from '@angular/core/testing';

import { GameSetNumberOfRefsService } from "./game-setnumberofrefs.service";

describe('GameSetNumberOfRefsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameSetNumberOfRefsService]
    });
  });

  it('should be created', inject([GameSetNumberOfRefsService], (service: GameSetNumberOfRefsService) => {
    expect(service).toBeTruthy();
  }));
});

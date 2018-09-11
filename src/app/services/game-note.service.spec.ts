import { TestBed, inject } from '@angular/core/testing';

import { GameNoteService } from './game-note.service';

describe('GameNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameNoteService]
    });
  });

  it('should be created', inject([GameNoteService], (service: GameNoteService) => {
    expect(service).toBeTruthy();
  }));
});

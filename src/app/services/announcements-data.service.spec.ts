import { TestBed, inject } from '@angular/core/testing';

import { AnnouncementsDataService } from './announcements-data.service';

describe('AnnouncementsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnouncementsDataService]
    });
  });

  it('should be created', inject([AnnouncementsDataService], (service: AnnouncementsDataService) => {
    expect(service).toBeTruthy();
  }));
});

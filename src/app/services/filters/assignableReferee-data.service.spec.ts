import { TestBed, inject } from '@angular/core/testing';

import { AssignableRefereeDataService } from './assignableReferee-data.service';

describe('AssignableRefereeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignableRefereeDataService]
    });
  });

  it('should be created', inject([AssignableRefereeDataService], (service: AssignableRefereeDataService) => {
    expect(service).toBeTruthy();
  }));
});

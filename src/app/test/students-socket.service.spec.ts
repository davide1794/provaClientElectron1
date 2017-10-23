import { TestBed, inject } from '@angular/core/testing';

import { StudentsSocketService } from '../service/students-socket.service';

describe('StudentsSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsSocketService]
    });
  });

  it('should be created', inject([StudentsSocketService], (service: StudentsSocketService) => {
    expect(service).toBeTruthy();
  }));
});

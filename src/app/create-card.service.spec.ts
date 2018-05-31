import { TestBed, inject } from '@angular/core/testing';

import { CreateCardService } from './create-card.service';

describe('CreateCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCardService]
    });
  });

  it('should be created', inject([CreateCardService], (service: CreateCardService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { DragonService } from './dragons.service';
describe('DragonsService', () => {
  let service: DragonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

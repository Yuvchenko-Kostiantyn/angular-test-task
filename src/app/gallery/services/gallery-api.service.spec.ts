import { TestBed } from '@angular/core/testing';

import { GalleryApiService } from './gallery-api.service';
import { cold } from "jasmine-marbles";

describe('GalleryApiService', () => {
  let service: GalleryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of 9 consecutive numbers', () => {
    const expected1 = cold('(a|)', { a: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
    expect(service.getIndexes(1)).toBeObservable(expected1);

    const expected2 = cold('(a|)', { a: [10, 11, 12, 13, 14, 15, 16, 17, 18] });
    expect(service.getIndexes(2)).toBeObservable(expected2);
  });

  it('should return empty array if page number is more than five', () => {
    const expected = cold('(a|)', { a: [] });
    expect(service.getIndexes(6)).toBeObservable(expected);
  });
});

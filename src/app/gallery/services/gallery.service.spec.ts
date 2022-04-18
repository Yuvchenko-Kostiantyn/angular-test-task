import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Keys } from "../../shared/enums/keys.enum";
import { GalleryApiService } from "./gallery-api.service";
import { cold } from "jasmine-marbles";

import Spy = jasmine.Spy;
import Func = jasmine.Func;
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;


describe('GalleryService', () => {
  let service: GalleryService;
  let subjectSpy: Spy<Func>;
  let mockStorageService: SpyObj<LocalStorageService>;
  let mockGalleryApiService: SpyObj<GalleryApiService>;
  const arrayOfFavorites = [1, 2, 3, 4, 5];

  beforeEach(() => {
    mockStorageService = createSpyObj('LocalStorageService', ['getItem', 'setItem']);
    mockGalleryApiService = createSpyObj('GalleryApiService', ['getIndexes']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: mockStorageService },
        { provide: GalleryApiService, useValue: mockGalleryApiService },
      ]});
    service = TestBed.inject(GalleryService);
    subjectSpy = spyOn(service.favoriteImages, 'next');
    mockStorageService.getItem.withArgs(Keys.FAVORITES).and.returnValue(JSON.stringify([...arrayOfFavorites]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When initializing favorites', () => {
    it('should get favorites from storage and pass emit subject', () => {
      service.initFavorites();
      expect(subjectSpy).toHaveBeenCalledWith([...arrayOfFavorites]);
    });

    it('should not emit if there are no values with that key', () => {
      mockStorageService.getItem.withArgs(Keys.FAVORITES).and.returnValue(null);

      service.initFavorites();
      expect(subjectSpy).toHaveBeenCalledWith([]);
    });
  });

  describe('When adding new favorite item', () => {
    it('should add a new favorite item', () => {
      const newIndex = 6;
      const newArrayOfFavorites = [...arrayOfFavorites, newIndex];

      service.addFavorite(newIndex);

      expect(mockStorageService.setItem).toHaveBeenCalledWith(Keys.FAVORITES, JSON.stringify(newArrayOfFavorites));
      expect(subjectSpy).toHaveBeenCalledWith(newArrayOfFavorites);
    });

    it('should not add a new favorite item if index already exists', () => {
      service.addFavorite(5);

      expect(mockStorageService.setItem).not.toHaveBeenCalled();
      expect(subjectSpy).not.toHaveBeenCalled();
    });
  });

  it('should remove item from favorites', () => {
    const filteredFavorites = [ 1, 2, 3, 4 ];
    service.removeFavorite(5);
    expect(mockStorageService.setItem).toHaveBeenCalledWith(Keys.FAVORITES, JSON.stringify(filteredFavorites));
    expect(subjectSpy).toHaveBeenCalledWith(filteredFavorites);
  });

  it('should return a list of image indexes', () => {
    const expected = cold('a', { a: [1, 2] })
    mockGalleryApiService.getIndexes.withArgs(10).and.returnValue(expected);

    expect(service.getPage(10)).toEqual(expected);
  });
});

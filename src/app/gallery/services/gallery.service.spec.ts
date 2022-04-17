import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Keys } from "../../shared/enums/keys.enum";

import Spy = jasmine.Spy;
import Func = jasmine.Func;
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('GalleryService', () => {
  let service: GalleryService;
  let subjectSpy: Spy<Func>;
  let mockStorageService: SpyObj<LocalStorageService>;
  const arrayOfFavorites = [1, 2, 3, 4, 5];

  beforeEach(() => {
    mockStorageService = createSpyObj('LocalStorageService', ['getItem', 'setItem']);
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: mockStorageService },
      ]});
    service = TestBed.inject(GalleryService);
    subjectSpy = spyOn(service.favoriteImages, 'next');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When initializing favorites', () => {
    it('should get favorites from storage and pass emit subject', () => {
      const rawValue = `{"testKey": "testValue"}`;
      const parsedValue = { testKey : 'testValue'};
      mockStorageService.getItem.withArgs(Keys.FAVORITES).and.returnValue(rawValue);

      service.initFavorites();
      expect(subjectSpy).toHaveBeenCalledWith(parsedValue);
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

      service.addFavorite(newIndex, arrayOfFavorites);

      expect(mockStorageService.setItem).toHaveBeenCalledWith(Keys.FAVORITES, JSON.stringify(newArrayOfFavorites));
      expect(subjectSpy).toHaveBeenCalledWith(newArrayOfFavorites);
    });

    it('should not add a new favorite item if index already exists', () => {
      service.addFavorite(5, [...arrayOfFavorites]);

      expect(mockStorageService.setItem).not.toHaveBeenCalled();
      expect(subjectSpy).not.toHaveBeenCalled();
    });
  });

  it('should remove item from favorites', () => {
    const filteredFavorites = [ 1, 2, 3, 4 ];

    mockStorageService.getItem.withArgs(Keys.FAVORITES).and.returnValue(JSON.stringify([...arrayOfFavorites]));

    service.removeFavorite(5);
    expect(mockStorageService.setItem).toHaveBeenCalledWith(Keys.FAVORITES, JSON.stringify(filteredFavorites));
    expect(subjectSpy).toHaveBeenCalledWith(filteredFavorites);
  });
});

import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Keys } from "../../shared/enums/keys.enum";
import { GalleryApiService } from "./gallery-api.service";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public favoriteImages = new BehaviorSubject<number[]>([]);

  constructor(
    private localStorageService: LocalStorageService,
    private galleryApiService: GalleryApiService,
  ) { }

  public initFavorites(): void {
    const favorites = this.localStorageService.getItem(Keys.FAVORITES) || '[]';
    this.favoriteImages.next(JSON.parse(favorites));
  }

  public addFavorite(id: number): void {
    const currentFavorites = JSON.parse(this.localStorageService.getItem(Keys.FAVORITES) || '[]');
    const isAlreadyFavorite = currentFavorites?.find((imageId: number) => imageId === id);
    if(!isAlreadyFavorite) {
      this.localStorageService.setItem(Keys.FAVORITES, JSON.stringify([...currentFavorites, id]));
      this.favoriteImages.next([...currentFavorites, id]);
    }
  }

  public removeFavorite(id: number)  {
    const filteredFavorites = JSON.parse(this.localStorageService.getItem(Keys.FAVORITES) || '[]')
      .filter((imageId: number) => imageId !== id);
    this.localStorageService.setItem('favorites', JSON.stringify(filteredFavorites));
    this.favoriteImages.next(filteredFavorites);
  }

  public getPage(pageNumber: number) {
    return this.galleryApiService.getIndexes(pageNumber);
  }
}

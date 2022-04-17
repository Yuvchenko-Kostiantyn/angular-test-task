import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { Keys } from "../../shared/enums/keys.enum";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public favoriteImages = new BehaviorSubject<number[]>([]);

  constructor(private localStorageService: LocalStorageService) { }

  public initFavorites(): void {
    const favorites = this.localStorageService.getItem(Keys.FAVORITES) || '[]';
    this.favoriteImages.next(JSON.parse(favorites));
  }

  public addFavorite(id: number, currentFavorites: number[]): void {
    const isAlreadyFavorite = currentFavorites.find(imageId => imageId === id);
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
}

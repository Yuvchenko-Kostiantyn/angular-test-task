import { Component, OnInit } from '@angular/core';
import { GalleryService } from "../../services/gallery.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public indexList: BehaviorSubject<number[]>;

  constructor(private galleryService: GalleryService) {
    this.indexList = galleryService.favoriteImages;
  }

  ngOnInit(): void {
    this.galleryService.initFavorites();
  }

}

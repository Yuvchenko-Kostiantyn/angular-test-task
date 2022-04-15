import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GalleryModule { }

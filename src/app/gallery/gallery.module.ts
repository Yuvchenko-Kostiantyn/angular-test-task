import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class GalleryModule { }

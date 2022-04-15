import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
  ]
})
export class GalleryModule { }

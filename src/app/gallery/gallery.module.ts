import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { ImageViewComponent } from './components/image-view/image-view.component';
import { RouterModule } from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent,
    ImageViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class GalleryModule { }

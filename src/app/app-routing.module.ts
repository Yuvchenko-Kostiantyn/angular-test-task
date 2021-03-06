import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from "./gallery/components/photos/photos.component";
import { FavoritesComponent } from "./gallery/components/favorites/favorites.component";
import {ImageViewComponent} from "./gallery/components/image-view/image-view.component";

const routes: Routes = [
  { path: '', component: PhotosComponent, pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites/:id', component: ImageViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

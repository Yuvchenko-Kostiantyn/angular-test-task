import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from "./gallery/photos/photos.component";
import { FavoritesComponent } from "./gallery/favorites/favorites.component";

const routes: Routes = [
  { path: '', component: PhotosComponent, pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

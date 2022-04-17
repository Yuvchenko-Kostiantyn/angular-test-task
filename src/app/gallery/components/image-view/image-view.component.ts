import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewComponent {
  public index: string;

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
  ) {
    this.index = route.snapshot.params['id'];
  }

  public onRemoveFromFavorites() {
    this.galleryService.removeFavorite(parseInt(this.index));
  }

}

import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public loading = false;
  public indexList: number[] = [];


  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.indexList = [...Array(10).keys()]
  }

  onImageClick(id: number) {
    this.galleryService.addFavorite(id);
  }
}

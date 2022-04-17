import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { ImageViewComponent } from './image-view.component';
import { GalleryService } from "../../services/gallery.service";

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('ImageViewComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;
  let mockGalleryService: SpyObj<GalleryService>;

  const imageId = 10;

  beforeEach(async () => {
    mockGalleryService = createSpyObj('GalleryService', ['removeFavorite']);
    await TestBed.configureTestingModule({
      declarations: [ ImageViewComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          snapshot: {
          params: {
            id: imageId
          }
        }
        }},
        { provide: GalleryService, useValue: mockGalleryService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call a method that deletes items item', () => {
    component.onRemoveFromFavorites();
    expect(mockGalleryService.removeFavorite).toHaveBeenCalledWith(10);
  });
});

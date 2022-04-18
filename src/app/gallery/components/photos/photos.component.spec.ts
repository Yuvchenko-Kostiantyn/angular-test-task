import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { MatCardModule } from "@angular/material/card";
import { GalleryService } from "../../services/gallery.service";
import { cold } from "jasmine-marbles";

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let mockGalleryService: SpyObj<GalleryService>;
  let observerSpy: SpyObj<IntersectionObserver>;

  beforeEach(async () => {
    spyOn(Math, 'random').and.returnValue(200);
    observerSpy = createSpyObj(IntersectionObserver, ['observe', 'disconnect']);
    mockGalleryService = createSpyObj('GalleryService', [ 'getPage', 'addFavorite' ]);
    mockGalleryService.getPage.and.returnValue(cold('a', { a: [1, 2]}));

    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      imports: [ MatCardModule ],
      providers: [{ provide: GalleryService, useValue: mockGalleryService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add image to favorites', () => {
    component.onImageClick(5);
    expect(mockGalleryService.addFavorite).toHaveBeenCalledWith(5);
  })

  it('should init', () => {
    component.ngOnInit();
    expect(mockGalleryService.getPage).toHaveBeenCalled();
  });

  it('should call api and subscribe to an observable', () => {
    const observable = cold('a', { a: [1, 2, 3]});
    mockGalleryService.getPage.and.returnValue(observable);
    spyOn(observable, "subscribe");
    component.getImages();

    expect(observable.subscribe).toHaveBeenCalled();
  });
});

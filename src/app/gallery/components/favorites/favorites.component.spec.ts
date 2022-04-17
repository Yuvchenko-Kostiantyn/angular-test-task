import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";

import { FavoritesComponent } from './favorites.component';
import { GalleryService } from "../../services/gallery.service";

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockGalleryService: SpyObj<GalleryService>;

  beforeEach(async () => {
    mockGalleryService = createSpyObj('GalleryService', ['initFavorites']);
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports: [
        MatCardModule,
      ],
      providers: [{provide: GalleryService, useValue: mockGalleryService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favorites', () => {
    component.ngOnInit();

    expect(mockGalleryService.initFavorites).toHaveBeenCalled()
  });
});

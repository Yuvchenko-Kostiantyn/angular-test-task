import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import { GalleryService } from "../../services/gallery.service";
import {delay, finalize, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('viewCard', { read: ElementRef })
  public viewCards!: QueryList<ElementRef>;

  public loading = false;
  public indexList: number[] = [];
  public currentPage: number = 1;
  private takeUntil$: Subject<void> = new Subject();
  private observer!: IntersectionObserver;


  constructor(private galleryService: GalleryService) { }

  public ngOnInit(): void {
    this.getImages();
  }

  public ngAfterViewInit(): void {
    this.initObserver();
    this.viewCards.changes.pipe(
      takeUntil(this.takeUntil$)
    ).subscribe((queryList: QueryList<ElementRef>) => {
      this.observer.observe(queryList.last.nativeElement);
    });
  }

  public ngOnDestroy(): void {
    this.takeUntil$.next();
    this.takeUntil$.complete();
  }

  public onImageClick(id: number): void {
    this.galleryService.addFavorite(id);
  }

  public getImages(): void {
    this.galleryService.getPage(this.currentPage).pipe(
      takeUntil(this.takeUntil$),
      tap(() => this.loading = true),
      delay(this.getRandomDelay()),
      finalize(() => this.loading = false),
    ).subscribe((data: number[]) => {
      this.currentPage += 1;
      this.indexList.push(...data);
    });
  }

  private observerCallback(entries: IntersectionObserverEntry[]): void {
    if(entries[0].isIntersecting) {
      this.getImages();
      this.observer.disconnect();
    }
  }

  private initObserver(): void {
    const options = {
      threshold: 0.95
    }
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), options);
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 100 + 200);
  }
}

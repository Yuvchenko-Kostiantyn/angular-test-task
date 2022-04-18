import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GalleryApiService {
  private totalPages = 5;
  private total = 1;
  private step = 9;

  constructor() { }

  public getIndexes(pageNumber: number): Observable<number[]> {
    if(pageNumber > this.totalPages) {
      this.total = 1;
      return of([]);
    }
    return of(this.indexGenerator());
  }

  private indexGenerator(): number[] {
    let array = [];
    for(let i = this.total; i<this.step + this.total; i++) {
      array.push(i);
    }
    this.total += this.step;
    console.log(array)
    return array;
  }
}



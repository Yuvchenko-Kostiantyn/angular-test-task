import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public indexList: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.indexList = [...Array(9).keys()]
  }

}

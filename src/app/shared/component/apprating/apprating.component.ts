import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './apprating.component.html',
  styleUrls: ['./apprating.component.scss'],
})
export class AppratingComponent implements OnInit {
  @Input() maxRating: number = 5;
  @Input() currentRating: number;
  @Output() rated = new EventEmitter<number>();
  stars: number[] = [];

  constructor() {
    this.stars = Array(this.maxRating)
      .fill(0)
      .map((_, index) => index + 1);
  }

  ngOnInit(): void {}

  rate(rating: number): void {
    this.rated.emit(rating);
  }
}

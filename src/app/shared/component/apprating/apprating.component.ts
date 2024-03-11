import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rating',
  templateUrl: './apprating.component.html',
  styleUrls: ['./apprating.component.scss'],
})
export class AppratingComponent {
  @Input() maxRating: number = 5;
  @Output() rated = new EventEmitter<number>();

  currentRating: number = 0;
  stars: number[] = [];

  constructor() {
    this.stars = Array(this.maxRating)
      .fill(0)
      .map((_, index) => index + 1);
  }

  public rate(rating: number): void {
    debugger;
    this.currentRating = rating;
    this.rated.emit(rating);
  }
}

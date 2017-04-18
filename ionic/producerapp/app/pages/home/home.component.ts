import { Component } from '@angular/core';

import { RatingComponent } from '../../shared/rating'

@Component({
  templateUrl: 'build/pages/home/home.component.html',
  directives : [
    RatingComponent
  ]
})
export class HomeComponent {
  private selectedRating: number;
}

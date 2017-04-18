import { Component } from '@angular/core';

import { NavController, Tab } from 'ionic-angular';

import { CarouselComponent } from '../../../shared/carousel'


@Component({
  templateUrl: 'build/pages/user/dashboard/dashboard.component.html',
  directives: [ CarouselComponent ]
})
export class DashboardComponent {
  private slides = [
    {
      description: 'A',
      color: '#ed1c24'
    },
    {
      description: 'B',
      color: '#0072bc'
    },
    {
      description: 'C',
      color: '#39b54a'
    },
    {
      description: 'D',
      color: '#f26522'
    },
    {
      description: 'E',
      color: '#630460'
    }
  ];
}


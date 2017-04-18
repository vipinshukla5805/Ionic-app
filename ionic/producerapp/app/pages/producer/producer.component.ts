import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UserService} from "../../shared/shared/user/user.service";
import {QuestionsComponent} from "../question";
import { CarouselComponent } from "../../shared/carousel/carousel.component"

@Component({
  templateUrl: 'build/pages/producer/producer.component.html',
  directives: [ CarouselComponent ]
})
export class ProducerComponent {

  constructor(private navCtrl: NavController) { }

  private slides = [
    {
      id:0,
      description: 'A',
      color: '#ed1c24',
      isSelected:false,
      imgUrl:'http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png'
    },
    {
      id:1,
      description: 'B',
      color: '#0072bc',
      isSelected:false,
      imgUrl:'http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png'
    },
    {
      id:2,
      description: 'C',
      color: '#39b54a',
      isSelected:false,
      imgUrl:'http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png'
    },
    {
      id:3,
      description: 'D',
      color: '#f26522',
      isSelected:false,
      imgUrl:'http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png'
    },
    {
      id:4,
      description: 'E',
      color: '#630460',
      isSelected:false,
      imgUrl:'http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png'
    }
  ];

  gotoQuestion() {
    this.navCtrl.setRoot(QuestionsComponent);
  }

  selectProducer(event:any){
    this.slides.forEach(ele=>{
      if(ele.id == event.idx){
        ele.isSelected = true;
        this.navCtrl.setRoot(QuestionsComponent);
      }
    })
  }
}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UserService} from "../../shared/shared/user/user.service";
import {ProducerComponent} from "../producer/producer.component";
import { ThanksComponent } from "../thanks"

import {ProfileComponent} from "../../shared"

@Component({
  templateUrl: 'build/pages/feedback/feedback.component.html',
  directives: [ ProfileComponent ]
})
export class FeedbackComponent {
  
  private Url:string = "http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";
  constructor(private navCtrl: NavController) {}

  saveFeedback(){
    this.navCtrl.push(ThanksComponent);
  }

}

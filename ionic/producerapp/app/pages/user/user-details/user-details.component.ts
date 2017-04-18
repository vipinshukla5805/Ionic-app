import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { DiagramComponent } from '../../../shared/diagram';
import {IUser} from "../../../shared/shared/user/user.schema";


@Component({
  templateUrl: 'build/pages/user/user-details/user-details.component.html',
  directives : [ DiagramComponent ]
})
export class UserDetailsComponent {
  private userDetails: IUser;

  constructor(
    private navParams: NavParams
  ) {
  }

  ngOnInit() {
    this.userDetails = this.navParams.get('userDetails');
  }
}

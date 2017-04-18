import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { IUser } from "../../shared/shared/user/user.schema";
import { UserService } from "../../shared/shared/user/user.service";
import {UserDetailsComponent} from "./user-details/user-details.component";

@Component({
  templateUrl: 'build/pages/user/user.component.html'
})
export class UserComponent {
  private users$: Observable<IUser[]>;

  constructor(
    private navController: NavController,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.users$ = this.userService.getUserData();
  }

  onTap(data) {
    this.navController.push(UserDetailsComponent, {
      userDetails: data
    })
  }
}


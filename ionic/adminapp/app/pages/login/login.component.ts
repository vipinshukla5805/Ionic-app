import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavController, LoadingController, Loading } from 'ionic-angular';

import { UserComponent } from "../user/user.component";
import { CognitoService } from "../../shared/aws";

@Component({
  templateUrl: 'build/pages/login/login.component.html'
})
export class LoginComponent {
  private errorMessage: string;
  private loginForm: FormGroup;
  private loading: Loading;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private cognitoService: CognitoService
  ) {
    this.initValidation();
    this.initLoadingBar();
  }

  private initValidation() {
    this.loginForm = this.fb.group({
      'username': [ '', Validators.required ],
      'password': [ '', Validators.required ]
    });
  }

  login() {
    this.errorMessage = '';
    this.loading.present();
    let username: string = this.loginForm.controls[ 'username' ].value.trim();
    let password: string = this.loginForm.controls[ 'password' ].value.trim();

    this.cognitoService.loginUser(username, password).then(res => {
      this.loading.destroy();
      this.navigateToDashboardPage();
    }).catch((errResp: any) => {
      this.loading.destroy();
      this.errorMessage = errResp.message;
    });
  }

  private initLoadingBar() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      showBackdrop: true,
      dismissOnPageChange: true
    });
  }

  private navigateToDashboardPage() {
    this.navCtrl.setRoot(UserComponent)
  }
}

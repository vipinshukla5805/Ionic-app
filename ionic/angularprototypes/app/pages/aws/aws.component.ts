import { Component } from '@angular/core';
import { CognitoService, DynamoDBService } from "../../shared/aws";

@Component({
  templateUrl: 'build/pages/aws/aws.component.html'
})

export class AWSComponent {
  public constructor(private cognitoService:CognitoService, private dynamoService:DynamoDBService) {
  }

  public items:any;

  public authAndGetData() {
    this.cognitoService.loginUser((err:any) => {
      if (err) {
        console.log(err);
      }
      this.getDataFromDB();
    });
  }

  private getDataFromDB() {
    let AWS = this.cognitoService.getAWS();
    this.dynamoService.getData(AWS, (err:any, data:any) => {
      if (err) {
        console.log(err);
      }
      if (data && data.Items) {
        this.items = JSON.stringify(data.Items, null, 4);
        this.items = data.Items;
      }
    });
  }

  public stringify(obj:any) {
    return JSON.stringify(obj, null, 4)
  }
}

import { Component, Type } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: 'build/pages/producerinfo/producerinfo.component.html'
})
export class ProducerComponent {

items=[];
constructor(public actionSheetCtrl: ActionSheetController){
    this.items = ["Producer","Producer","Producer","Producer","Producer","Producer","Producer","Producer"];
}

presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'PhotoUpload',
     buttons: [
       {
         text: 'Upload',
         icon:'cloud-upload',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Image link/url',
         icon: 'attach',
         handler: () => {
           console.log('Archive clicked');
         }
       },{
         text: 'Delete Photo',
         role: 'destructive',
         icon:'close-circle',
         handler: () => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }


}


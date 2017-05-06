import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';




import firebase from 'firebase';


@Component({
  selector: 'page-listus',
  templateUrl: 'listus.html'
})
export class ListUs {

  
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController
              ) {    
                  this.usuarios = this.af.database.list('/usuarios');
  }


}

import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import firebase from 'firebase';

import { AuthProvider } from '../auth-provider'; 

import { ListRes } from '../administrador/listres/listres';
import { ListUs } from '../administrador/listus/listus';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class Admin {

  
  usuarios: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  pistas: FirebaseListObservable<any>;
  loginForm:any;
  res:any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider
              ) {    
  }

  verReservas(){
    this.navCtrl.push(ListRes);
  }

  verUsuarios(){
    this.navCtrl.push(ListUs);
  }

  verEstadisticas(){
    
  }

  logout(){
    this.auth.logout();
  }


}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../pages/auth-provider'

import { HomePage } from '../pages/home/home'
import { Registro } from '../pages/registro'

// Envio de notificaciones
//import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  selector: 'page-auth',
  templateUrl: 'autenticacion.html'
})
export class Auth {

  loginForm:any;
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider,
              //Envio de notificaciones
              //public push: Push
              ) 
  {
    this.usuarios = af.database.list('/usuarios');

    //Envio de notificaciones
    /*this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });*/

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",Validators.required)
    });
  }

  signin() {
    
    this.auth.signin(this.loginForm.value)
    .then((data) => {
        this.navCtrl.push(HomePage);
    }, (error) => {
      console.log("Error: ",error.message);
    });
  };

  createAccount() {
    /*
    let credentials = this.loginForm.value;
    this.auth.createAccount(credentials)
    .then((data) => {
      console.log("uid: ",data.uid);
      this.usuarios.push({
              uid: data.uid
            });

    }, (error) => {
      console.log("Error: ",error.message);
    });*/
    this.navCtrl.push(Registro);
  };

}

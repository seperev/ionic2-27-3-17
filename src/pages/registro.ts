import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../pages/auth-provider'

import { HomePage } from '../pages/home/home'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class Registro {

  loginForm:any;
  ab: boolean;
  notificaciones: boolean;
  login:any;
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider,
              public toastCtrl: ToastController
              ) 
  {
    this.usuarios = af.database.list('/usuarios');
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",Validators.required),
        
    });
    this.login = new FormGroup({
        nombre: new FormControl(""),
        dni: new FormControl("",Validators.required),
        telefono: new FormControl(""),
        abonado: new FormControl(""),
        nivel: new FormControl(""),
        notificaciones: new FormControl(""),
    })
  }

  createAccount() {
    let datos = this.login.value;
    let encontrado = false;
    this.usuarios.subscribe(items => {
      items.forEach(usuario => {
        if(usuario.nombre == datos.nombre){
              let toast = this.toastCtrl.create({
                message: 'El usuario ya existe',
                duration: 3000
              });
              toast.present();
              encontrado = true;
        }
      })
    });
    if(!encontrado){
    let credentials = this.loginForm.value;
    
    this.auth.createAccount(credentials)
    .then((data) => {
      console.log("uid: ",data.uid);
      this.usuarios.push({
              uid: data.uid,
              nombre: datos.nombre,
              dni: datos.dni,
              telefono: datos.telefono,
              abonado: this.ab,
              nivelJuego: datos.nivel,
              notificaciones: this.notificaciones,
            });

    }, (error) => {
      console.log("Error: ",error.message);
    });
    }
    
  };
}

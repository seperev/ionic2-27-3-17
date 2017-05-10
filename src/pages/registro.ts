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

  booleanos: any;
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
    this.booleanos = {
      ab: false,
      notificaciones: false
    }
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",Validators.required),
        
    });
    this.login = new FormGroup({
        nombre: new FormControl("",Validators.required),
        dni: new FormControl("",Validators.required),
        telefono: new FormControl(""),
        nivel: new FormControl(""),
    })
  }

  createAccount() {
    let datos = this.login.value;
    let encontrado = false;
    let terminado = false;
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
      terminado = true;

      if(terminado){
      if(!encontrado){
      console.log("he entrado");
      let credentials = this.loginForm.value;
      
      let ab = document.getElementById('abonado');
      let n = document.getElementById('notificaciones');
      console.log(ab.lastChild.attributes.item(6).nodeValue);
      console.log(n.lastChild.attributes.item(6).nodeValue);


      this.auth.createAccount(credentials)
      .then((data) => {
        console.log("uid: ",data.uid);
        this.usuarios.push({
                uid: data.uid,
                nombre: datos.nombre,
                dni: datos.dni,
                telefono: datos.telefono,
                abonado: ab.lastChild.attributes.item(6).nodeValue,
                nivelJuego: datos.nivel,
                notificaciones: n.lastChild.attributes.item(6).nodeValue,
              });

      }, (error) => {
        console.log("Error: ",error.message);
      });

      //this.navCtrl.push(HomePage);
      }
    }

    });


    
  };
}

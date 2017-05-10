import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
//import { AuthProvider } from '../pages/auth-provider'
//import { DataProvider } from '../pages/data-provider'

//import { HomePage } from '../pages/home/home'
import firebase from 'firebase';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class Usuario {

  usersRef: any = firebase.database().ref('usuarios');
  //user:any;

  ab: boolean;
  notificaciones: boolean;
  datos:any;
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;

    dni: any;
    telefono: any;
    abonado: any;
    nivel: any;
    noti: any;
    nombre: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              //public auth: AuthProvider,
              //public data: DataProvider
              ) 
  {

    
    
    this.nombre = this.navParams.get('nombre');
    this.dni = this.navParams.get('dni');
    this.telefono = this.navParams.get('telefono');
    this.abonado = this.navParams.get('abonado');
    this.nivel = this.navParams.get('nivel');
    this.noti = this.navParams.get('noti');
    //console.log(this.user.uid);
  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(""),
        dni: new FormControl(""/*,Validators.required*/),
        telefono: new FormControl(""/*,Validators.required*/),
        abonado: new FormControl(""),
        nivel: new FormControl(""),
        notificaciones: new FormControl(""),
    })
    console.log(this.datos);
  }

  guardar(){
    let d = this.datos.value;
    this.usuario.subscribe(items => {
      items.forEach(us => {
        this.usuarios.remove(us);
      })
    })
    this.usuarios.push({
      nombre:d.nombre,
      dni: d.dni,
      telefono: d.telefono,
      abonado: d.abonado,
      nivel: d.nivel,
      notificaciones: d.notificaciones,
      //uid: this.user.uid Aquí hay que añadir el uid del usuario que se está modificando
    })
  }

  
}

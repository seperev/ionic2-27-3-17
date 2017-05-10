import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
//import { AuthProvider } from '../pages/auth-provider'
//import { DataProvider } from '../pages/data-provider'

import { HomePage } from '../home/home';
import firebase from 'firebase';

@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})
export class Reserva {

  usersRef: any = firebase.database().ref('usuarios');
  //user:any;

  reservas: FirebaseListObservable<any>;
  
    uid:any;
    nombre: any;
    inicio: any;
    pista: any;
    usuario: any;
    dia: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              //public auth: AuthProvider,
              //public data: DataProvider
              ) 
  {

    
    this.reservas = af.database.list('/reservas');

    this.nombre = this.navParams.get('nombre');
    this.inicio = this.navParams.get('inicio');
    this.pista = this.navParams.get('pista');
    this.usuario = this.navParams.get('usuario');
    this.dia = this.navParams.get('dia');
    this.uid = this.navParams.get('uid');
    //console.log(this.user.uid);
  }

/*
  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(""),
        dni: new FormControl(""),
        telefono: new FormControl(""),
        abonado: new FormControl(""),
        nivel: new FormControl(""),
        notificaciones: new FormControl(""),
    })
    console.log(this.datos);
  }*/

  eliminar(){

    let reserva = this.af.database.list('/reservas', {
        query: {
            orderByChild: 'uid',
            equalTo: this.uid
        }
    });

    reserva.subscribe(items => {
      items.forEach(res => {
        this.reservas.remove(res);
      })
      this.navCtrl.push(HomePage);
    })
    
  }

  
}

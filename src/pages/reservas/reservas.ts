import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';

import firebase from 'firebase';

import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html'
})
export class Reservas {

  //reservas: [string];
  usuarios: FirebaseListObservable<any>;
  reserva:any;

  pista:any;
  hora:any;
  user:any;
  nombre:any;
  us:any;
  res:any;

  //usuariosRef: any = firebase.database().ref('usuarios');
  //reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController,
              public params: NavParams) {

    this.usuarios = af.database.list('/usuarios');

    this.pista = params.get('pista');
    this.hora = params.get('hora');
    this.user = firebase.auth().currentUser;
    console.log(this.user.uid);
    this.us = af.database.list('/usuarios', {
      query: {
        orderByChild: 'uid',
        equalTo: this.user.uid
      }
    });   

    /*this.usuariosRef.orderByChild('uid').equalTo(this.user.uid).on("child_added", function(snapshot){
      this.nombre = snapshot.val().nombre;
      console.log(snapshot.val().nombre);
    })*/

  }

  
  ngOnInit() {
    this.reserva = new FormGroup({
        nombre: new FormControl(""),
        abonados: new FormControl(""),
        noabonados: new FormControl(""),
        hora: new FormControl(""),
        pista: new FormControl("")
    })
  }

}
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
  reservas: FirebaseListObservable<any>;

  pista:any;
  hora:any;
  user:any;
  nombre:any;
  us:any;
  res:any;
  dia:any;

  //usuariosRef: any = firebase.database().ref('usuarios');
  //reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController,
              public params: NavParams) {

    this.usuarios = af.database.list('/usuarios');
    this.reservas = af.database.list('/reservas');

    this.pista = params.get('pista');
    this.hora = params.get('hora');
    this.dia = params.get('dia');
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
    this.us.subscribe(items => {
      items.forEach(usuario => {
        this.nombre = usuario.nombre;
      })
      console.log('nombre del usuario ' + this.nombre);
    })
    //console.log('nombre del usuario ' + this.nombre);
    
  }

  reservar(){
    let r = this.reserva.value;
    this.reservas.push({
      dia: this.dia,
      horaInicio: this.hora,
      nombre: 'Reserva de ' + this.nombre,
      nombrePista: this.pista,
      uid: this.dia + '-' + this.hora,
      abonados: r.abonados,
      noabonados: r.noabonados,
      usuario: this.nombre
    })
    this.navCtrl.push(HomePage);
  }

}
import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { Reserva } from '../reserva';

import firebase from 'firebase';


@Component({
  selector: 'page-listres',
  templateUrl: 'listres.html'
})
export class ListRes {

  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()-5).toString();
  maxFecha: string = (new Date().getFullYear()+3).toString();
  reservasRef: any = firebase.database().ref('reservas');
  res: any;

  //reservas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController
              ) {

                //this.reservas = af.database.list('/reservas');
                this.res = af.database.list('/reservas', {
                  query: {
                    orderByChild: 'dia',
                    equalTo: this.fecha.substr(0,10)
                  }
                }); 
  }

    verDia(fecha){
    console.log(fecha);
    console.log(this.res);
    //window.location.reload();
    
    this.res = this.af.database.list('/reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });
  }

  verReserva(r){
    let nombre = r.nombre;
    let inicio = r.horaInicio;
    let fin = r.horaFin;
    let pista = r.nombrePista;
    let usuario = r.usuario;
    let dia = r.dia;
    let uid = r.uid;
   

    this.navCtrl.push(Reserva, {
      nombre: nombre,
      inicio: inicio,
      fin: fin,
      pista: pista,
      usuario: usuario,
      dia: dia,
      uid: uid
    })
  }


}

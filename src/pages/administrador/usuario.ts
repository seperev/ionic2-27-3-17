import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
//import { AuthProvider } from '../pages/auth-provider'
//import { DataProvider } from '../pages/data-provider'

//import { HomePage } from '../pages/home/home'

import { Admin } from '../administrador/admin'
import { ListUs } from '../administrador/listus/listus'

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
    user: any;

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

    this.user = firebase.auth().currentUser;
    this.usuario = this.af.database.list('/usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });

  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(this.navParams.get('nombre')),
        dni: new FormControl(this.navParams.get('dni')),
        telefono: new FormControl(this.navParams.get('telefono')),
        abonado: new FormControl(this.navParams.get('abonado')),
        nivel: new FormControl(this.navParams.get('nivel')),
        notificaciones: new FormControl(this.navParams.get('noti')),
    })
    console.log(this.datos);
  }

  guardar(){
    let d = this.datos.value;

    this.usuario.subscribe(items => {
      items.forEach(us => {
        firebase.database().ref('usuarios/' + us.$key).update({
          nombre: d.nombre,
          dni: d.dni,
          telefono: d.telefono,
          abonado: d.abonado,
          nivelJuego: d.nivel,
          notificaciones: d.notificaciones,
        })
        console.log(us.$key);        
      })
      this.navCtrl.push(Admin);
    })
  }

  eliminar(){
    this.usuario.subscribe(items => {
      items.forEach(us => {
        this.usuarios.remove(us);
      })
    })
  }

  
}

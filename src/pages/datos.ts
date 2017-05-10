import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../pages/auth-provider'
import { DataProvider } from '../pages/data-provider'

import { HomePage } from '../pages/home/home'
import firebase from 'firebase';

@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html'
})
export class Datos {

  usersRef: any = firebase.database().ref('usuarios');
  user:any;

  abonado: any;
  notificaciones: any;
  datos:any;
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public auth: AuthProvider,
              public data: DataProvider
              ) 
  {
    this.usuarios = af.database.list('/usuarios');
    this.user = firebase.auth().currentUser;
    this.usuario = this.af.database.list('/usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });
    console.log(this.user.uid);
  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(""),
        dni: new FormControl(""/*,Validators.required*/),
        telefono: new FormControl(""/*,Validators.required*/),
        nivel: new FormControl(""),
    })
    console.log(this.datos);
  }

  guardar(){
    let d = this.datos.value;
    let niv = document.getElementById('nivel');
    let ab = document.getElementById('abonado');
    let n = document.getElementById('notificaciones');
    //console.log(ab.lastChild.attributes.item(6).nodeValue);
    //console.log(n.lastChild.attributes.item(6).nodeValue);
    
    //this.niv = '<div class="select-text">Medio</div>';

    //console.log(niv.childNodes.item(2));
    //this.usersRef.child().update({nombre:d.nombre});
    //this.usuario.nombre = this.datos.nombre;
    /*
    firebase.database().ref('usuarios/' + this.user.uid).update({
      nombre: 'hola'
    });*/
    //this.data.modificarUsuario(this.user.uid);
    let termina = false;
    let entra = 0;
    this.usuario.subscribe(items => {
      items.forEach(us => {
        //this.usuarios.remove(us);
        firebase.database().ref('usuarios/' + us.$key).update({
          nombre: d.nombre,
          dni: d.dni,
          telefono: d.telefono,
          abonado: ab.lastChild.attributes.item(6).nodeValue,
          nivelJuego: d.nivel,
          notificaciones: n.lastChild.attributes.item(6).nodeValue,
        })
        console.log(us.$key);
        /*
        us.nombre.update(d.nombre);
        us.dni.update(d.dni);
        us.telefono.set(d.telefono);
        us.abonado.set(ab.lastChild.attributes.item(6).nodeValue);
        us.nivel.set(d.nivel);
        us.notificaciones.set(n.lastChild.attributes.item(6).nodeValue);
        */

        //this.usuarios.update(us);
        //us.nombre === 'añsldfjaslf'
      })
      
      entra++;
      termina = true;
      //console.log('hola');
    })
    this.usuario.subscribe(items => {
      //console.log(entra);
    })
    //console.log(entra);
    if(termina){
      //console.log("terminado");
      /*
      this.usuarios.push({
        nombre:d.nombre,
        dni: d.dni,
        telefono: d.telefono,
        abonado: ab.lastChild.attributes.item(6).nodeValue,
        nivel: d.nivel,
        notificaciones: n.lastChild.attributes.item(6).nodeValue,
        uid: this.user.uid
      })
      */
      
    }
    else{
      //console.log("no ha terminado");
    }
    

    //this.usuarios.remove();
    /*
    this.usuario.subscribe(items => {
      items.forEach(usuar => {
        usuar.nombre === 'adios'
      })
    });*/
  }

  cancelar(){
      this.navCtrl.push(HomePage);
  }

  /*createAccount() {    
    
    let datos = this.datos.value;
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
    
  };*/
}

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
  
  nom = "";
  dn = "";
  tel = "";
  ni = "";

  referencia: any;

  

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

    this.usuario.subscribe(items =>{
      items.forEach(u => {
        this.nom = u.nombre,
        this.dn = u.dni,
        this.tel = u.telefono,
        this.ni = u.nivel
        //this.referencia = firebase.database().ref('usuarios/' + u.$key)
      })
      console.log('Ahora entra para llenar los datos del usuario');
        this.datos = new FormGroup({
        nombre: new FormControl(this.nom),
        dni: new FormControl(this.dn),
        telefono: new FormControl(this.tel),
        nivel: new FormControl(this.ni),
    })
    })

    this.referencia = this.navParams.get('referencia');  
    console.log(this.user.uid);
  }


  ngOnInit() {

    let dat: any;
    let terminado = false;
    /*
    this.usuario.subscribe(items =>{
      items.forEach(u => {
        dat = {
            nombre: u.nombre,
            dni: u.dni,
            telefono: u.telefono,
            nivel: u.nivel,
        }
      })
      terminado = true;
    })
    if(terminado){
    this.datos = new FormGroup({
          nombre: new FormControl(dat.nombre),
          dni: new FormControl(dat.dni),
          telefono: new FormControl(dat.telefono),
          nivel: new FormControl(dat.nivel),
      })}*/

    
    this.datos = new FormGroup({
        nombre: new FormControl(this.nom),
        dni: new FormControl(this.dn),
        telefono: new FormControl(this.tel),
        nivel: new FormControl(this.ni),
    })
    
    console.log(this.datos);
  }

  guardar(dat){
    /*
    this.datos = new FormGroup({
      nombre: new FormControl(''),
      dni: new FormControl(""),
      telefono: new FormControl(""),
      nivel: new FormControl(""),
    })*/

/*
    this.datos = new FormGroup({
        nombre: new FormControl(this.nom),
        dni: new FormControl(this.dn),
        telefono: new FormControl(this.tel),
        nivel: new FormControl(this.ni),
    })
    */

    let d = this.datos.value;
    let niv = document.getElementById('nivel');
    let ab = document.getElementById('abonado');
    let n = document.getElementById('notificaciones');
    let nom = document.getElementById('dni');
    //console.log('nombre ', nom);

    console.log('datos al pulsar el boton',this.datos);
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

    this.referencia.update({
          nombre: d.nombre,
          dni: d.dni,
          telefono: d.telefono,
          abonado: ab.lastChild.attributes.item(6).nodeValue,
          nivelJuego: d.nivel,
          notificaciones: n.lastChild.attributes.item(6).nodeValue
        })
        console.log('valor del toggle abonado ', ab.lastChild.attributes.item(6).nodeValue);
        console.log('valor del toggle notificaciones ', n.lastChild.attributes.item(6).nodeValue);
        this.navCtrl.push(HomePage);


/*
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

      /*  
      })

      this.navCtrl.push(HomePage);
    })*/
    

    

    //this.usuarios.remove();
    /*
    this.usuario.subscribe(items => {
      items.forEach(usuar => {
        usuar.nombre === 'adios'
      })
    });*/
  }

  actualizarAbonado(){
    let ab = document.getElementById('abonado');
    this.abonado = ab.lastChild.attributes.item(6).nodeValue;
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

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Auth } from '../pages/autenticacion';
import { Reservas } from '../pages/reservas/reservas';
import { Registro } from '../pages/registro';
import { Datos } from '../pages/datos';
import { Admin } from '../pages/administrador/admin';
import { ListRes } from '../pages/administrador/listres/listres';
import { ListUs } from '../pages/administrador/listus/listus';

import { AuthProvider } from '../pages/auth-provider';
import { DataProvider } from '../pages/data-provider';

//Para el envio de notificaciones
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyA0ALrLoiBkouur2GmjXsJVi90CmAO2fFU",
    authDomain: "prueba-5f14d.firebaseapp.com",
    databaseURL: "https://prueba-5f14d.firebaseio.com",
    storageBucket: "prueba-5f14d.appspot.com",
    messagingSenderId: "334413686662"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


//Envio notificaciones
/*const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fa8755c8'
  },
  'push': {
    'sender_id': '334413686662',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};*/


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Reservas,
    Auth,
    Registro,
    Datos,
    Admin,
    ListRes,
    ListUs,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    // Envio de notificaciones
    /*IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Reservas,
    Auth,
    Registro,
    Datos,
    Admin,
    ListRes,
    ListUs,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider, DataProvider]
})
export class AppModule {}

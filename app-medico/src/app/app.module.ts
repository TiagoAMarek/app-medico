import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

// pages
import { LoginPage } from './../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { HomePageModule } from '../pages/home/home.module';
import { MenuPageModule } from '../pages/menu/menu.module';

import { AuthProvider } from '../providers/auth/auth';
import { EstadosMunicipiosProvider } from '../providers/estados-municipios/estados-municipios';

// AF 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyBrnQp_nlUJdE2nEUkNctTBlbblI4e75W0",
  authDomain: "healthhelper-f4d1c.firebaseapp.com",
  databaseURL: "https://healthhelper-f4d1c.firebaseio.com",
  projectId: "healthhelper-f4d1c",
  storageBucket: "healthhelper-f4d1c.appspot.com",
  messagingSenderId: "1053972456544"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HomePageModule,
    HttpModule,
    MenuPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    EstadosMunicipiosProvider
  ]
})
export class AppModule {}

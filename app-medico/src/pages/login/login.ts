import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../home/home';
import { CadastroPage } from './../cadastro/cadastro';

import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginForm:FormGroup;
  private loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
  public formBuilder: FormBuilder, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  public loginUser(){
    if (!this.loginForm.valid){
      console.warn(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.senha)
      .then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  public irCadastro(): void {
    this.navCtrl.push(CadastroPage);
  }

}

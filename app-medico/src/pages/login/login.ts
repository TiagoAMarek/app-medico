import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

import { MenuPage } from '../menu/menu';
import { CadastroPage } from './../cadastro/cadastro';

import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginForm: FormGroup;
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

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
        this.navCtrl.setRoot(MenuPage);
      }, error => {
        this.loading.dismiss().then( () => {
          this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          }).present();
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

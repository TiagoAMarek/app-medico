import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { MenuPage } from '../menu/menu';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  private cadastroForm: FormGroup;
  private loading: Loading;

  constructor(
    public nav: NavController,
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.cadastroForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      crm: ['', Validators.compose([Validators.required])],
      especialidade: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      bairro: ['', Validators.compose([Validators.required])],
      logradouro: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Cadastro do usuário
   * @return {void}
   */
  cadastrarUsuario(): void {
    try {
      if (!this.cadastroForm.valid) {
        console.log(this.cadastroForm.value);
        throw "Preencha todos os campos!";
      }
      this.authData.signupUser(this.cadastroForm.value)
      .then(() => {
        this.nav.setRoot(MenuPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let errorMessage: string = error.message;
          this.alertCtrl.create({
            message: errorMessage,
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
    } catch(e) {
      console.warn("Cadastro de usuário - ", e);
      this.alertCtrl.create({
        message: e,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      }).present();
    }
  }
}

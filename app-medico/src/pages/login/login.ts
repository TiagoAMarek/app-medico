import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CadastroPage } from './../cadastro/cadastro';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  irCadastro(): void {
    this.navCtrl.push(CadastroPage);
  }

}

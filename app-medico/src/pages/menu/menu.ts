import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  private loading: Loading;
  public rootPage: any = HomePage;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  /**
   * Desloga o usuário
   * @return {void}
   */
  public logout(): void {
    this.authData.logoutUser()
    .then(res => {
      this.navCtrl.push(LoginPage);
    }, error => {
      console.error('Falha ao deslogar', error);
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: "Falha ao deslogar",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

}

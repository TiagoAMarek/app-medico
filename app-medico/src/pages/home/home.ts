import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public agenda;
  public solicitacoes: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {
    this.consultarSolicitacoes();
  }

  /**
   * Busca a agenda do médico
   * @return {void}
   */
  consultarSolicitacoes(): void {
    this.agenda = this.db.list('/agenda', {
      query: {
        orderByChild: 'uid',
        equalTo: window.localStorage.getItem('uid')
      }
    });
    this.agenda = this.agenda.subscribe(res => {
      this.solicitacoes = res;
      this.agenda.unsubscribe();
    });
  }

}

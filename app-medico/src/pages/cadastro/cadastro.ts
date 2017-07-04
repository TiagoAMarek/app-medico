import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth/auth';
import { EstadosMunicipiosProvider } from '../../providers/estados-municipios/estados-municipios';
import { MenuPage } from '../menu/menu';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  private cadastroForm: FormGroup;
  private loading: Loading;
  private listaEspecialidades: any[] = [];
  private listaEstados: any[] = [];
  private listaMunicipios: any[] = [];

  constructor(
    public nav: NavController,
    public authData: AuthProvider,
    public emData: EstadosMunicipiosProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public db: AngularFireDatabase

  ) {
    this.cadastroForm = formBuilder.group({
      email         : ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      senha         : ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nome          : ['', Validators.compose([Validators.required])],
      crm           : ['', Validators.compose([Validators.required])],
      especialidade : ['', Validators.compose([Validators.required])],
      estado        : ['', Validators.compose([Validators.required])],
      cidade        : [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      bairro        : ['', Validators.compose([Validators.required])],
      logradouro    : ['', Validators.compose([Validators.required])],
    });

    // captura a lista de estados
    emData.getEstados()
    .subscribe(res => {
      this.listaEstados = Object.keys(res);
    });

    // captura a lista de especialidades
    this.db.list('/especialidades')
    .subscribe(res => {
      this.listaEspecialidades = res;
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

  /**
   * Altera a lista de municípios de acordo com o estado
   * @return {void}
   */
  alterarListaMunicipios() {
    this.cadastroForm.controls.cidade.disable();
    this.emData.getCidades(this.cadastroForm.value.estado)
    .subscribe(res => {
      this.cadastroForm.controls.cidade.enable();
      this.listaMunicipios = Object.keys(res);
    });
  }
}

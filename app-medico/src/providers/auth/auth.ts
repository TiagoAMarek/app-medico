import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  medicos: FirebaseListObservable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    this.medicos = db.list('/medicos');
  }

  /**
   * Loga o usuário no Firebase
   * @param  {string} newEmail
   * @param  {string} newPassword
   * @return {firebase.Promise<any>}
   */
  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
	  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
	}

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * Desloga o usuário do Firebase
   * @return {firebase.Promise<any>}
   */
  logoutUser(): firebase.Promise<any> {
    window.localStorage.removeItem('uid');
    return this.afAuth.auth.signOut();
  }

  /**
   * Cadastra um médico no Firebase
   * @param  {string} data Dados do formulário de cadastro
   * @return {firebase.Promise<any>}
   */
  signupUser(data: any): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.senha)
      .then(authRes => {
        window.localStorage.setItem('uid', authRes.uid);
        this.medicos.push({
          email         : data.email,
          nome          : data.nome,
          crm           : data.crm,
          especialidade : data.especialidade.toUpperCase(),
          estado        : data.estado.toUpperCase(),
          cidade        : data.cidade.toUpperCase(),
          bairro        : data.bairro,
          logradouro    : data.logradouro,
          uid           : authRes.uid
        }).then(res => {
          return firebase.Promise.resolve();
        }, error => {
          // TODO Rollback na criação do usuário de autenticação
          console.error("cadastro de usuário - ", error);
          return firebase.Promise.reject(new Error("falha ao cadastrar médico na base"));
        });
      }, error => {
        console.error('Cadastro de usuário - ', error['message']);

        let message = 'Falha ao cadastrar novo usuário';
        if(error['code'] === "auth/email-already-in-use") {
          message = "Este email já está sendo utilizado";
        }
        return firebase.Promise.reject(new Error(message));
      });
  }

}

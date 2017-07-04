import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadosMunicipiosProvider {
  private apiUrl = 'http://ibge.herokuapp.com';

  constructor(
    public http: Http
  ) {}

  public getEstados() {
    return this.http.get(this.apiUrl + '/estado/UF')
      .map(response => response.json());
  }

  public getCidades(estado) {
    return this.http.get(this.apiUrl + '/municipio/?val=' + estado)
      .map(response => response.json());
  }
}

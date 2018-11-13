import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';

@Injectable()
export class ModalidadeService {

  modalidadesUrl: string;

  constructor(private http: AuthHttp) {
    this.modalidadesUrl = `${environment.apiUrl}/modalidades`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.modalidadesUrl)
      .toPromise()
      .then(response => response.json());
  }
}

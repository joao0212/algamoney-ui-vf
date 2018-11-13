import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { Professor } from '../core/model';

@Injectable()
export class ProfessoresService {

  professoresUrl: string;

  constructor(private http: AuthHttp) {
    this.professoresUrl = `${environment.apiUrl}/professores`;
  }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.professoresUrl}`)
      .toPromise()
      .then(response => {
        const professores = response.json();
        const resultado = {
          professores
        };

        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.professoresUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.professoresUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(professor: Professor): Promise<Professor> {
    return this.http.post(this.professoresUrl, JSON.stringify(professor))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(professor: Professor): Promise<Professor> {
    return this.http.put(`${this.professoresUrl}/${professor.codigo}`,
      JSON.stringify(professor))
      .toPromise()
      .then(response => response.json() as Professor);
  }

  buscarPorCodigo(codigo: number): Promise<Professor> {
    return this.http.get(`${this.professoresUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Professor);
  }
}

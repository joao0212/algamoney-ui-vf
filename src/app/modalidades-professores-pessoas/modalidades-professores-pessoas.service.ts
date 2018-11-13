import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { ModalidadeProfessorPessoa } from '../core/model';

@Injectable()
export class ModalidadesProfessoresPessoasService {

  modalidadesProfessoresPessoasUrl: string;

  constructor(private http: AuthHttp) {
    this.modalidadesProfessoresPessoasUrl = `${environment.apiUrl}/modprofaluno`;
  }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.modalidadesProfessoresPessoasUrl}`)
      .toPromise()
      .then(response => {
        const modalidadesProfessoresPessoas = response.json();
        const resultado = {
          modalidadesProfessoresPessoas
        };

        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.modalidadesProfessoresPessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(modalidadesProfessoresPessoas: ModalidadeProfessorPessoa): Promise<ModalidadeProfessorPessoa> {
    return this.http.post(this.modalidadesProfessoresPessoasUrl, JSON.stringify(modalidadesProfessoresPessoas))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(modalidadesProfessoresPessoas: ModalidadeProfessorPessoa): Promise<ModalidadeProfessorPessoa> {
    return this.http.put(`${this.modalidadesProfessoresPessoasUrl}/${modalidadesProfessoresPessoas.codigo}`,
      JSON.stringify(modalidadesProfessoresPessoas))
      .toPromise()
      .then(response => response.json() as ModalidadeProfessorPessoa)
  }

  buscarPorCodigo(codigo: number): Promise<ModalidadeProfessorPessoa> {
    return this.http.get(`${this.modalidadesProfessoresPessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as ModalidadeProfessorPessoa);
  }
}

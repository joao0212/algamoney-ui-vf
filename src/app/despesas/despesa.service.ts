import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';
import { Despesa } from '../core/model';

@Injectable()
export class DespesaService {

  despesasUrl: string;

  constructor(private http: AuthHttp) {
    this.despesasUrl = `${environment.apiUrl}/despesas`;
  }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.despesasUrl}`)
      .toPromise()
      .then(response => {
        const despesas = response.json();

        const resultado = {
          despesas,
        };

        return resultado
      });
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.despesasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(despesa: Despesa): Promise<any> {
    return this.http.post(this.despesasUrl, JSON.stringify(despesa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(despesa: Despesa): Promise<any> {
    return this.http.put(`${this.despesasUrl}/${despesa.codigo}`, JSON.stringify(despesa))
      .toPromise()
      .then(response => {
        const despesaAlterada = response.json() as Despesa;

        this.converterStringsParaDatas([despesaAlterada]);

        return despesaAlterada
      });
  }

  buscarPorCodigo(codigo: number): Promise<Despesa> {
    return this.http.get(`${this.despesasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const despesa = response.json() as Despesa;

        this.converterStringsParaDatas([despesa]);

        return despesa;
      });
  }

  private converterStringsParaDatas(despesas: Despesa[]) {
    for (const despesa of despesas) {

      despesa.dataVencimento = moment(despesa.dataVencimento,
        'YYYY-MM-DD').toDate();

      despesa.dataPagamento = moment(despesa.dataPagamento,
        'YYYY-MM-DD').toDate();
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-despesa-pesquisa',
  templateUrl: './despesa-pesquisa.component.html',
  styleUrls: ['./despesa-pesquisa.component.css']
})
export class DespesaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  despesas = [];
  @ViewChild('tabela') grid;

  constructor(
    private despesaService: DespesaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de despesas')
    this.pesquisar();
  }

  pesquisar() {
    this.despesaService.pesquisar()
      .then(resultado => {
        this.despesas = resultado.despesas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(despesa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(despesa);
      }
    });
  }

  excluir(despesa: any) {
    this.despesaService.excluir(despesa.codigo)
      .then(() => {
        this.toasty.success('Despesa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

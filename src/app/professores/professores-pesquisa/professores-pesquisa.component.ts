import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessoresService } from '../professores.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-professores-pesquisa',
  templateUrl: './professores-pesquisa.component.html',
  styleUrls: ['./professores-pesquisa.component.css']
})
export class ProfessoresPesquisaComponent implements OnInit {

  professores = [];
  @ViewChild('tabela') grid;

  constructor(
    private professoresService: ProfessoresService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de professores');
    this.pesquisar();
  }

  pesquisar() {
    this.professoresService.pesquisar()
      .then(resultado => {
        this.professores = resultado.professores;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(professor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(professor);
      }
    });
  }

  excluir(professor: any) {
    this.professoresService.excluir(professor.codigo)
      .then(() => {
        this.toasty.success('Professor excluído com sucesso!');
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatus(professor: any): void {
    const novoStatus = !professor.ativo;

    this.professoresService.mudarStatus(professor.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        professor.ativo = novoStatus;
        this.toasty.success(`Professor ${acao} com sucesso!`)
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}

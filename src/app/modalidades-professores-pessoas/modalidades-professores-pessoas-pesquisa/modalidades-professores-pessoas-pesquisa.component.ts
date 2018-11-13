import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalidadesProfessoresPessoasService } from '../modalidades-professores-pessoas.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-modalidades-professores-pessoas-pesquisa',
  templateUrl: './modalidades-professores-pessoas-pesquisa.component.html',
  styleUrls: ['./modalidades-professores-pessoas-pesquisa.component.css']
})
export class ModalidadesProfessoresPessoasPesquisaComponent implements OnInit {

  modalidadeProfessorPessoa = [];
  @ViewChild('tabela') grid;

  constructor(
    private modalidadesProfessoresPessoasService: ModalidadesProfessoresPessoasService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Relação professores / alunos por modalidade');
    this.pesquisar();
  }

  pesquisar() {
    this.modalidadesProfessoresPessoasService.pesquisar()
      .then(resultado => {
        this.modalidadeProfessorPessoa = resultado.modalidadesProfessoresPessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(modalidadeProfessorPessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modalidadeProfessorPessoa);
      }
    });
  }

  excluir(modalidadeProfessorPessoa: any) {
    this.modalidadesProfessoresPessoasService.excluir(modalidadeProfessorPessoa.codigo)
      .then(() => {
        this.toasty.success('Registro excluído com sucesso!');
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}

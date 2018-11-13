import { Component, OnInit } from '@angular/core';
import { ModalidadeProfessorPessoa } from '../../core/model';
import { ModalidadesProfessoresPessoasService } from '../modalidades-professores-pessoas.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../../pessoas/pessoa.service';
import { ModalidadeService } from '../../modalidades/modalidade.service';
import { ProfessoresService } from '../../professores/professores.service';

@Component({
  selector: 'app-modalidades-professores-pessoas-cadastro',
  templateUrl: './modalidades-professores-pessoas-cadastro.component.html',
  styleUrls: ['./modalidades-professores-pessoas-cadastro.component.css']
})
export class ModalidadesProfessoresPessoasCadastroComponent implements OnInit {

  modalidadeProfessorPessoa = new ModalidadeProfessorPessoa();
  pessoas = [];
  modalidades = [];
  professores = [];
  modalidadesProfessoresPessoas = [];

  constructor(
    private modalidadesProfessoresPessoasService: ModalidadesProfessoresPessoasService,
    private pessoaService: PessoaService,
    private modalidadeService: ModalidadeService,
    private professorService: ProfessoresService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarModalidade();
    this.carregarProfessor();

    const codigoModalidadeProfessorPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo registro');

    if (codigoModalidadeProfessorPessoa) {
      this.carregarModalidadeProfessorPessoa(codigoModalidadeProfessorPessoa);
    }
  }

  get editando() {
    return Boolean(this.modalidadeProfessorPessoa.codigo)
  }

  procurarAluno(event) {
    let query = event.query;
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = this.filtrarAluno(query, pessoas);
      });
  }

  filtrarAluno(query, pessoas: any[]): any[] {
    let filtrado: any[] = [];
    for (let i = 0; i < pessoas.length; i++) {
      let pessoa = pessoas[i];
      if (pessoa.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrado.push(pessoa);
      };
    }
    return filtrado;
  }

  carregarProfessor() {
    this.professorService.pesquisar()
      .then(resultado => {
        this.professores = resultado.professores
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModalidade() {
    this.modalidadeService.listarTodas()
      .then(modalidades => {
        this.modalidades = modalidades
          .map(m => ({ label: m.nome, value: m.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModalidadeProfessorPessoa(codigo: number) {
    this.modalidadesProfessoresPessoasService.buscarPorCodigo(codigo)
      .then(modalidadeProfessorPessoa => {
        this.modalidadeProfessorPessoa = modalidadeProfessorPessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarModalidadeProfessorPessoa(form);
    } else {
      this.adicionarModalidadeProfessorPessoa(form);
    }
  }
  adicionarModalidadeProfessorPessoa(form: FormControl) {
    this.modalidadesProfessoresPessoasService.adicionar(this.modalidadeProfessorPessoa)
      .then(modalidadeProfessorPessoaAdicionada => {
        this.toasty.success('Registro adicionado com sucesso!');
        this.router.navigate(['/modalidadesporprofessor', modalidadeProfessorPessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarModalidadeProfessorPessoa(form: FormControl) {
    this.modalidadesProfessoresPessoasService.atualizar(this.modalidadeProfessorPessoa)
      .then(modalidadeProfessorPessoa => {
        this.modalidadeProfessorPessoa = modalidadeProfessorPessoa;

        this.toasty.success('Registro alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.modalidadeProfessorPessoa = new ModalidadeProfessorPessoa();
    }.bind(this), 1);

    this.router.navigate(['/modalidadesporprofessor/novo']);

  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de registro`);
  }
}



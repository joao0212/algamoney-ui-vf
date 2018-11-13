import { Component, OnInit } from '@angular/core';
import { Professor } from '../../core/model';
import { ProfessoresService } from '../professores.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-professores-cadastro',
  templateUrl: './professores-cadastro.component.html',
  styleUrls: ['./professores-cadastro.component.css']
})
export class ProfessoresCadastroComponent implements OnInit {

  professor = new Professor();

  constructor(
    private professoresService: ProfessoresService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoProfessor = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo professor');

    if (codigoProfessor) {
      this.carregarProfessor(codigoProfessor);
    }
  }

  get editando() {
    return Boolean(this.professor.codigo);
  }

  carregarProfessor(codigo: number) {
    this.professoresService.buscarPorCodigo(codigo)
      .then(professor => {
        this.professor = professor;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProfessor(form);
    } else {
      this.adicionarProfessor(form);
    }
  }

  adicionarProfessor(form: FormControl) {
    this.professoresService.adicionar(this.professor)
      .then(professorAdicionado => {
        this.toasty.success('Professor adicionado com sucesso!');
        this.router.navigate(['/professores', professorAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProfessor(form: FormControl) {
    this.professoresService.atualizar(this.professor)
      .then(professor => {
        this.professor = professor;
        this.toasty.success('Professor alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.professor = new Professor();
    }.bind(this), 1);

    this.router.navigate(['/professores/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de professor: ${this.professor.nome}`);
  }

}

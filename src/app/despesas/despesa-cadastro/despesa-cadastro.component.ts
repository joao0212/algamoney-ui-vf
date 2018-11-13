import { Component, OnInit } from '@angular/core';
import { Despesa } from '../../core/model';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { DespesaService } from '../despesa.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-despesa-cadastro',
  templateUrl: './despesa-cadastro.component.html',
  styleUrls: ['./despesa-cadastro.component.css']
})
export class DespesaCadastroComponent implements OnInit {

  categorias = [];
  despesa = new Despesa();

  constructor(
    private categoriaService: CategoriaService,
    private despesaService: DespesaService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoDespesa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova despesa');

    if (codigoDespesa) {
      this.carregarDespesa(codigoDespesa);
    }

    this.carregarCategorias();
  }

  get editando() {
    return Boolean(this.despesa.codigo);
  }

  carregarDespesa(codigo: number) {
    this.despesaService.buscarPorCodigo(codigo)
      .then(despesa => {
        this.despesa = despesa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarDespesa(form);
    } else {
      this.adicionarDespesa(form);
    }
  }

  adicionarDespesa(form: FormControl) {
    this.despesaService.adicionar(this.despesa)
      .then(despesaAdicionada => {
        this.toasty.success('Despesa adicionada com sucesso!');
        this.router.navigate(['/despesas', despesaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarDespesa(form: FormControl) {
    this.despesaService.atualizar(this.despesa)
      .then(despesa => {
        this.despesa = despesa;
        this.toasty.success('Despesa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.despesa = new Despesa();
    }.bind(this), 1);

    this.router.navigate(['/despesas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edicação de despesa: ${this.despesa.descricao}`);
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespesaPesquisaComponent } from './despesa-pesquisa/despesa-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { DespesaCadastroComponent } from './despesa-cadastro/despesa-cadastro.component';

const routes: Routes = [
  {
    path: 'despesas',
    component: DespesaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'despesas/nova',
    component: DespesaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    path: 'despesas/:codigo',
    component: DespesaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }

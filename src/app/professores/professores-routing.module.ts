import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { ProfessoresCadastroComponent } from './professores-cadastro/professores-cadastro.component';
import { ProfessoresPesquisaComponent } from './professores-pesquisa/professores-pesquisa.component';

const routes: Routes = [
  {
    path: 'professores',
    component: ProfessoresPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'professores/novo',
    component: ProfessoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: 'professores/:codigo',
    component: ProfessoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfessoresRoutingModule { }

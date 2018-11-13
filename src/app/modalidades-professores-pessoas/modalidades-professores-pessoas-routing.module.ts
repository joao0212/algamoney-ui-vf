import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalidadesProfessoresPessoasPesquisaComponent } from './modalidades-professores-pessoas-pesquisa/modalidades-professores-pessoas-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { ModalidadesProfessoresPessoasCadastroComponent } from './modalidades-professores-pessoas-cadastro/modalidades-professores-pessoas-cadastro.component';

const routes: Routes = [
  {
    path: 'modalidadesporprofessor',
    component: ModalidadesProfessoresPessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'modalidadesporprofessor/novo',
    component: ModalidadesProfessoresPessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: 'modalidadesporprofessor/:codigo',
    component: ModalidadesProfessoresPessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ModalidadesProfessoresPessoasRoutingModule { }

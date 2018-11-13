import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalidadesProfessoresPessoasPesquisaComponent } from './modalidades-professores-pessoas-pesquisa/modalidades-professores-pessoas-pesquisa.component';
import { ModalidadesProfessoresPessoasCadastroComponent } from './modalidades-professores-pessoas-cadastro/modalidades-professores-pessoas-cadastro.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalidadesProfessoresPessoasRoutingModule } from './modalidades-professores-pessoas-routing.module';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ButtonModule } from 'primeng/components/button/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    DataTableModule,
    AutoCompleteModule,
    DropdownModule,
    ButtonModule,


    SharedModule,
    ModalidadesProfessoresPessoasRoutingModule
  ],
  declarations: [
    ModalidadesProfessoresPessoasPesquisaComponent,
    ModalidadesProfessoresPessoasCadastroComponent
  ],
  exports: []
})
export class ModalidadesProfessoresPessoasModule { }

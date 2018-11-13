import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresCadastroComponent } from './professores-cadastro/professores-cadastro.component';
import { ProfessoresPesquisaComponent } from './professores-pesquisa/professores-pesquisa.component';
import { ProfessoresRoutingModule } from './professores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextModule,
    InputMaskModule,

    SharedModule,
    ProfessoresRoutingModule
  ],
  declarations: [
    ProfessoresCadastroComponent,
    ProfessoresPesquisaComponent
  ],
  exports: []
})
export class ProfessoresModule { }

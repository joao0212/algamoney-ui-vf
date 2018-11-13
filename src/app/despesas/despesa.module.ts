import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaCadastroComponent } from './despesa-cadastro/despesa-cadastro.component';
import { DespesaPesquisaComponent } from './despesa-pesquisa/despesa-pesquisa.component';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SharedModule } from './../shared/shared.module';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DataTableModule,
    TooltipModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    CurrencyMaskModule,
    SelectButtonModule,
    InputTextModule,
    ButtonModule,

    SharedModule,
    DespesaRoutingModule,
    
  ],
  declarations: [
    DespesaCadastroComponent,
    DespesaPesquisaComponent
  ]
})
export class DespesaModule { }

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { DespesaModule } from './despesas/despesa.module';
import { ProfessoresModule } from './professores/professores.module';
import { ModalidadesProfessoresPessoasModule } from './modalidades-professores-pessoas/modalidades-professores-pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    DespesaModule,
    ProfessoresModule,
    ModalidadesProfessoresPessoasModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

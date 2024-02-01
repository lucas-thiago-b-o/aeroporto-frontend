import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { HomeComponent } from './components/views/home/home.component';
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from './components/auth/login/login.component';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { PassagemComponent } from './components/views/passagem/passagem.component';
import { VooComponent } from './components/views/voo/voo.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { PreenchimentoDadosComponent } from './components/views/preenchimento-dados/preenchimento-dados.component';
import { PreenchimentoAssentoComponent } from './components/views/preenchimento-assento/preenchimento-assento.component';
import {TextMaskModule} from "angular2-text-mask";
import { MinhasPassagensComponent } from './components/views/minhas-passagens/minhas-passagens.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    PassagemComponent,
    VooComponent,
    PreenchimentoDadosComponent,
    PreenchimentoAssentoComponent,
    MinhasPassagensComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatMomentDateModule
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule,
    MatSelectModule,
    TextMaskModule,
    MatListModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

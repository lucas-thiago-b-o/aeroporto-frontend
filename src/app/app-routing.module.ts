import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/views/home/home.component";
import {AuthGuard} from "./shared/auth.guard";
import {RoleGuard} from "./shared/role.guard";
import {LoginComponent} from "./components/auth/login/login.component";
import {PassagemComponent} from "./components/views/passagem/passagem.component";
import {VooComponent} from "./components/views/voo/voo.component";
import {MinhasPassagensComponent} from "./components/views/minhas-passagens/minhas-passagens.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'minhas_passagens',
    component: MinhasPassagensComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'comprar_passagem',
    component: PassagemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'voos',
    component: VooComponent,
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

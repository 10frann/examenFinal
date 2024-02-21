import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from './guards/login.guard';
import { ErrorComponent } from './pages/error/error.component';
import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [
  {path: '', children:[
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate:[loginGuard]},
    {path: 'error', component: ErrorComponent},
    {path: 'home/:id', component: ProductoComponent},
    {path: '**', redirectTo:'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

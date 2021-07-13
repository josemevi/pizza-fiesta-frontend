import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pizzas', component: PizzasComponent},
  {path: 'pizzas/create', component: PizzaCreateComponent},
  {path: 'pizzas/edit/:id', component: PizzaCreateComponent},
  {path: 'pizzas/details/:id', component: PizzaDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

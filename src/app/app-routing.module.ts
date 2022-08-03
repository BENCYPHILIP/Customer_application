import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutComponent } from './components/about/about.component';
import { OrderComponent } from './components/order/order.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'customers',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'order',
    component:OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'about',
    component:AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'logout',
    component:LogoutComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

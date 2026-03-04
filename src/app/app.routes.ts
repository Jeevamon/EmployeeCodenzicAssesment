import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { LoginComponent } from './components/login/login';
import { EmployeeFormComponent } from './components/employee-form/employee-form';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },

  { path: 'add', component: EmployeeFormComponent, canActivate: [authGuard] },

  { path: 'edit/:id', component: EmployeeFormComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: '**', redirectTo: 'dashboard' }

];

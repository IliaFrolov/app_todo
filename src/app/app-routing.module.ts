import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'todo/:id', component: ProjectComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ],

  exports: [RouterModule],

})
export class AppRoutingModule { }

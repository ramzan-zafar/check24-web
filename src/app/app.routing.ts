import { Routes, RouterModule } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { FilmListComponent } from './film-list/film-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

const appRoutes: Routes = [
    { path: '', component: FilmListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: CreateUserComponent },
    { path: 'films', component: FilmListComponent },

    // otherwise redirect to filmlist
    { path: '**', redirectTo: 'films' }
];

export const routing = RouterModule.forRoot(appRoutes);
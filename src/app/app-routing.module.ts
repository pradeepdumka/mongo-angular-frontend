import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent} from '@components';
import { UserGuard } from './auth/user.guard';
const routes: Routes = [
  {
    path:'',redirectTo:'user' ,pathMatch:'full'
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) ,canActivate: [UserGuard]},
  {
    path:'**',component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

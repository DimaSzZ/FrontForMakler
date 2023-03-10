import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/auth/register/register.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./api/services/guard";
import {AdminpanelComponent} from "./pages/adminpanel/adminpanel.component";
import {HomeComponent} from "./components/admin/home/home.component";
import {CreatecsComponent} from "./components/admin/cat-sub/createcs/createcs.component";
import {UpdatecsComponent} from "./components/admin/cat-sub/updatecs/updatecs.component";
import {DeletecsComponent} from "./components/admin/cat-sub/deletecs/deletecs.component";
import {CreateComponent} from "./components/admin/ads/create/create.component";
import {UpdateComponent} from "./components/admin/ads/update/update.component";
import {DeleteComponent} from "./components/admin/ads/delete/delete.component";
import {CreatecComponent} from "./components/admin/city/createc/createc.component";
import {UpdatecComponent} from "./components/admin/city/updatec/updatec.component";
import {DeletecComponent} from "./components/admin/city/deletec/deletec.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminpanelComponent,
    children: [
      {
        path: 'crud-cat',
        component: HomeComponent,
      },
      {
        path: 'crud-cat',
        children: [
          {path: 'create', component: CreatecsComponent},
          {path: 'update', component: UpdatecsComponent},
          {path: 'delete', component: DeletecsComponent},
        ]
      },
      {
        path: 'crud-ad',
        children: [
          {path: 'create', component: CreateComponent},
          {path: 'update', component: UpdateComponent},
          {path: 'delete', component: DeleteComponent},
        ]
      },
      {
        path: 'crud-city',
        children: [
          {path: 'create', component: CreatecComponent},
          {path: 'update', component: UpdatecComponent},
          {path: 'delete', component: DeletecComponent},
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


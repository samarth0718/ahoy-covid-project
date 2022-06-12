import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnautorizedComponent } from './components/unautorized/unautorized.component';

const routes: Routes = [{
  path: '', 
  loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule)
},
{
  path: 'unautorized',
  component: UnautorizedComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

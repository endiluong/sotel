import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}

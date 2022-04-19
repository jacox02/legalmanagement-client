import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesComponent } from './cases/cases.component';
import { ClientsComponent } from './clients/clients.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { ReportsComponent } from './reports/reports.component';

let routes: Routes = [
  { path: '', redirectTo: 'cases', pathMatch: 'full' },
  {
    path: 'cases',
    component: CasesComponent,
  },
  {
    path: 'lawyers',
    component: LawyersComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ngOnInit() {}
}

import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ClientsComponent } from './clients/clients.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { FoodComponent } from './food/food.component';

let routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'food',
    component: FoodComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
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

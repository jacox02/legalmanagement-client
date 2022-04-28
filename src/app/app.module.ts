import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { FoodComponent } from './food/food.component';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    FoodComponent,
    OrdersComponent,
    NavbarComponent,
    NotfoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

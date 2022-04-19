import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { LawyersComponent } from './lawyers/lawyers.component';
import { CasesComponent } from './cases/cases.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { ReportsComponent } from './reports/reports.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    LawyersComponent,
    CasesComponent,
    NavbarComponent,
    NotfoundComponent,
    ReportsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

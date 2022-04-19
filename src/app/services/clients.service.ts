import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../models/Client.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpClient: HttpClient) {}

  public getAllClients(): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/clients/get/all`
    );
  }

  public deleteClient(caseID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/clients/remove/${caseID}`
    );
  }
}

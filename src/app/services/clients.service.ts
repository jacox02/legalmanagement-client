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

  public saveOrUpdateCase(
    clientToSave: IClient,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/clients/create`,
        clientToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/clients/update`,
        clientToSave
      );
    }
    return observable;
  }
}

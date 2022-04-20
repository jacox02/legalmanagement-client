import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICase } from '../models/Case.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private httpClient: HttpClient) {}

  public getAllCases(): Observable<ICase[]> {
    return this.httpClient.get<ICase[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/cases/get/all`
    );
  }
  public deleteCase(caseID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/cases/remove/${caseID}`
    );
  }
  public saveOrUpdateCase(
    caseToSave: ICase,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/cases/create`,
        caseToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/cases/update`,
        caseToSave
      );
    }
    return observable;
  }

  public filterCases(filters: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/cases/filter/`,
      filters
    );
  }
}

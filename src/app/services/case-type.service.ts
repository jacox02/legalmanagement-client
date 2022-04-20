import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICaseType } from '../models/CaseType.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseTypeService {
  constructor(private httpClient: HttpClient) {}

  public getAllCasesType(): Observable<ICaseType[]> {
    return this.httpClient.get<ICaseType[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/types/get/all`
    );
  }
  public deleteCaseType(caseID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/types/remove/${caseID}`
    );
  }
  public saveOrUpdateCaseType(
    caseToSave: ICaseType,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/types/create`,
        caseToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/types/update`,
        caseToSave
      );
    }
    return observable;
  }
}

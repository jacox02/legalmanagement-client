import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILawyer } from '../models/Lawyer.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LawyersService {
  constructor(private httpClient: HttpClient) {}

  public getAllLawyers(): Observable<ILawyer[]> {
    return this.httpClient.get<ILawyer[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/lawyers/get/all`
    );
  }
  public saveOrUpdateLawyer(
    lawyerToSave: ILawyer,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/lawyers/create`,
        lawyerToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/lawyers/update`,
        lawyerToSave
      );
    }
    return observable;
  }

  public deleteLawyer(lawyerID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/lawyers/remove/${lawyerID}`
    );
  }
}

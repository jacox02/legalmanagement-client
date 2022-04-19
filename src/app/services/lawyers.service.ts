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
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFood } from '../models/Food.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  public getAllFood(): Observable<IFood[]> {
    return this.httpClient.get<IFood[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/food/get/all`
    );
  }
  public saveOrUpdateFoodr(
    foodToSave: IFood,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/food/create`,
        foodToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/food/update`,
        foodToSave
      );
    }
    return observable;
  }

  public deleteFoodr(foodID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/food/remove/${foodID}`
    );
  }
}

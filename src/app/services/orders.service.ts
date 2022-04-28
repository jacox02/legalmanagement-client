import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/Order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public getAllOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(
      `${environment.API_URL}:${environment.API_URL_PORT}/orders/get/all`
    );
  }
  public deleteOrder(orderID: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/orders/remove/${orderID}`
    );
  }
  public saveOrUpdateOrder(
    orderToSave: IOrder,
    editMode: boolean
  ): Observable<any> {
    let observable: Observable<any>;

    if (!editMode) {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/orders/create`,
        orderToSave
      );
    } else {
      observable = this.httpClient.post(
        `${environment.API_URL}:${environment.API_URL_PORT}/orders/update`,
        orderToSave
      );
    }
    return observable;
  }

  public filterOrders(filters: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.API_URL}:${environment.API_URL_PORT}/orders/filter/`,
      filters
    );
  }
}

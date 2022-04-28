import { ICaseType } from './CaseType.model';
import { IClient } from './Client.model';
import { IFood } from './Food.model';

export interface IOrder {
  OrderID: number;
  Date: Date;
  Status: boolean;
  Description: string;
  Address: string;
  Food: IFood | number | any;
  Client: IClient | number | any;
}

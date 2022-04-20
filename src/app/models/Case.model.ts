import { ICaseType } from './CaseType.model';
import { IClient } from './Client.model';
import { ILawyer } from './Lawyer.model';
export interface ICase {
  CaseID: number;
  Date: Date;
  Status: boolean;
  Description: string;
  CaseType: ICaseType | number | any;
  Lawyer: ILawyer | number | any;
  Client: IClient | number | any;
}

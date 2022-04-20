import { ICaseType } from './CaseType.model';
import { IClient } from './Client.model';
import { ILawyer } from './Lawyer.model';
export interface IFilter {
  CaseType: number;
  Lawyer: number;
  Client: number;
  Status: number;
}

import { Component, OnInit } from '@angular/core';

import { ICase } from '../models/Case.model';
import { IClient } from '../models/Client.model';
import { ILawyer } from '../models/Lawyer.model';
import { ICaseType } from '../models/CaseType.model';

import { CasesService } from '../services/cases.service';
import { ClientsService } from '../services/clients.service';
import { LawyersService } from '../services/lawyers.service';
import Swal from 'sweetalert2';
import { CaseTypeService } from '../services/case-type.service';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
})
export class CasesComponent implements OnInit {
  constructor(
    private casesService: CasesService,
    private clientsService: ClientsService,
    private lawyerService: LawyersService,
    private caseTypeService: CaseTypeService
  ) {}

  public casesList: ICase[] = [];
  public lawyerList: ILawyer[] = [];
  public clientList: IClient[] = [];
  public caseTypeList: ICaseType[] = [];

  public selectedCase!: ICase;

  public editMode: boolean = false;

  ngOnInit(): void {
    this.GetAllCases();
    this.selectedCase = {
      CaseID: 0,
      Date: new Date(),
      Status: false,
      Description: '',
      CaseType: 0,
      Lawyer: '',
      Client: '',
    };
    this.clientsService.getAllClients().subscribe((response: IClient[]) => {
      this.clientList = response;
    });
    this.caseTypeService
      .getAllCasesType()
      .subscribe((response: ICaseType[]) => {
        this.caseTypeList = response;
      });
    this.lawyerService.getAllLawyers().subscribe((response: ILawyer[]) => {
      this.lawyerList = response;
    });
  }

  GetAllCases(): void {
    this.casesService.getAllCases().subscribe((response: ICase[]) => {
      this.casesList = response;
    });
  }

  changeLawyer(e: any) {
    this.selectedCase.Lawyer = parseInt(e.target.value);
  }
  changeClient(e: any) {
    this.selectedCase.Client = parseInt(e.target.value);
  }
  changeStatus(e: any) {
    this.selectedCase.Status = e.target.value;
  }
  changeDescription(e: any) {
    this.selectedCase.Description = e.target.value;
  }
  changeCaseType(e: any) {
    this.selectedCase.CaseType = e.target.value;
  }

  EditCase(caseSelected: ICase): void {
    this.editMode = true;

    this.selectedCase = {
      CaseID: caseSelected.CaseID,
      Date: caseSelected.Date,
      Status: caseSelected.Status,
      Description: caseSelected.Description.toString(),
      CaseType: caseSelected.CaseType,
      Lawyer: caseSelected.Lawyer.LawyerID,
      Client: caseSelected.Client.ClientID,
    };
  }
  NewCase(): void {
    this.editMode = false;

    this.selectedCase = {
      CaseID: 0,
      Date: new Date(),
      Status: this.selectedCase.Status,
      Description: this.selectedCase.Description,
      CaseType: this.selectedCase.CaseType,
      Lawyer: this.selectedCase.Lawyer,
      Client: this.selectedCase.Client,
    };
  }
  DeleteCase(caseSelected: ICase): void {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.casesService
          .deleteCase(caseSelected.CaseID)
          .subscribe((response) => {
            Swal.fire(response.message, '', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Caso no borrado', '', 'info');
      }
    });
    setTimeout(() => {
      this.GetAllCases();
    }, 5000);
  }
  SaveUpdate(): void {
    this.casesService
      .saveOrUpdateCase(this.selectedCase, this.editMode)
      .subscribe((response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    this.GetAllCases();
  }
  CloseModal(): void {
    this.selectedCase = {
      CaseID: 0,
      Date: new Date(),
      Status: false,
      Description: '',
      CaseType: 0,
      Lawyer: '',
      Client: '',
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { ICase } from '../models/Case.model';
import { IClient } from '../models/Client.model';
import { ILawyer } from '../models/Lawyer.model';
import { CasesService } from '../services/cases.service';
import { ClientsService } from '../services/clients.service';
import { LawyersService } from '../services/lawyers.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
})
export class CasesComponent implements OnInit {
  constructor(
    private casesService: CasesService,
    private clientsService: ClientsService,
    private lawyerService: LawyersService
  ) {}

  public casesList: ICase[] = [];
  public lawyerList: ILawyer[] = [];
  public clientList: IClient[] = [];

  public selectedCase!: ICase;

  public editMode: boolean = false;

  ngOnInit(): void {
    this.GetAllCases();
    this.selectedCase = {
      CaseID: 0,
      Date: new Date(),
      Status: false,
      Description: '',
      CaseTypeID: 0,
      Lawyer: '',
      Client: '',
    };
    this.clientsService.getAllClients().subscribe((response: IClient[]) => {
      this.clientList = response;
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

  EditCase(caseSelected: ICase): void {
    this.editMode = true;
    this.selectedCase = {
      CaseID: caseSelected.CaseID,
      Date: caseSelected.Date,
      Status: caseSelected.Status,
      Description: caseSelected.Description.toString(),
      CaseTypeID: caseSelected.CaseTypeID,
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
      CaseTypeID: 0,
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
      .saveOrUpdateCase(this.selectedCase, false)
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
      CaseTypeID: 0,
      Lawyer: '',
      Client: '',
    };
  }
}

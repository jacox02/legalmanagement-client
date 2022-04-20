import { Component, OnInit } from '@angular/core';
import { CasesService } from '../services/cases.service';
import { ClientsService } from '../services/clients.service';
import { LawyersService } from '../services/lawyers.service';
import { ICase } from '../models/Case.model';
import { IClient } from '../models/Client.model';
import { ILawyer } from '../models/Lawyer.model';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CaseTypeService } from '../services/case-type.service';
import { ICaseType } from '../models/CaseType.model';
import { IFilter } from '../models/Filters.model';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(
    private casesService: CasesService,
    private clientsService: ClientsService,
    private lawyerService: LawyersService,
    private caseTypeService: CaseTypeService
  ) {}

  public casesList: ICase[] = [];
  public caseTypeList: ICaseType[] = [];
  public lawyerList: ILawyer[] = [];
  public clientList: IClient[] = [];

  public filters!: IFilter;

  public headers: any[] = [];
  public reportToPrint: string = '';

  ngOnInit(): void {
    this.casesService.getAllCases().subscribe((response: ICase[]) => {
      this.casesList = response;
    });
    this.caseTypeService
      .getAllCasesType()
      .subscribe((response: ICaseType[]) => {
        this.caseTypeList = response;
      });
    this.clientsService.getAllClients().subscribe((response: IClient[]) => {
      this.clientList = response;
    });
    this.lawyerService.getAllLawyers().subscribe((response: ILawyer[]) => {
      this.lawyerList = response;
    });

    this.filters = {
      CaseType: 0,
      Lawyer: 0,
      Client: 0,
      Status: 0,
    };
  }

  GenerateData(caseList: ICase[]): any[] {
    let result: any[] = [];

    caseList.map((caseToTransform: ICase) => {
      result.push([
        caseToTransform.CaseID,
        `${caseToTransform.Client.Firstname} ${caseToTransform.Client.Lastname}`,
        `${caseToTransform.Status ? 'Activo' : 'Inactivo'}`,
        caseToTransform.Date,
        caseToTransform.Description,
      ]);
    });

    return result;
  }

  GenerarReporte(): void {
    const doc = new jsPDF();
    doc.setFontSize(11);
    doc.setTextColor(100);
    let dataToShow = this.GenerateData(this.casesList);
    autoTable(doc, {
      head: [['ID', 'Cliente', 'Abogado', 'Estado', 'Fecha', 'Descripcion']],
      columnStyles: { 0: { halign: 'center' } },
      margin: { top: 30 },
      didDrawPage: (data) => {
        doc.setFontSize(18);
        doc.text('Reporte', data.settings.margin.left + 2, 22);
      },
      body: dataToShow,
    });
    doc.save('Reporte.pdf');
  }

  ddlClientChange(e: any) {
    this.filters.Client = parseInt(e.target.value);
    this.FilterDataChange();
  }
  ddlLawyerChange(e: any) {
    this.filters.Lawyer = parseInt(e.target.value);
    this.FilterDataChange();
  }

  ddlTypeChange(e: any) {
    this.filters.CaseType = parseInt(e.target.value);
    this.FilterDataChange();
  }
  ddlStatusChange(e: any) {
    this.filters.Status = e.target.value;
    this.FilterDataChange();
  }
  FilterDataChange() {
    this.casesService.filterCases(this.filters).subscribe((response) => {
      this.casesList = response;
    });
  }
}

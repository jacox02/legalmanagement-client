import { Component, OnInit } from '@angular/core';
import { ILawyer } from '../models/Lawyer.model';
import { LawyersService } from '../services/lawyers.service';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
})
export class LawyersComponent implements OnInit {
  constructor(private lawyerService: LawyersService) {}

  public lawyersList: ILawyer[] = [];
  ngOnInit(): void {
    this.GetAllLawyers();
  }

  GetAllLawyers() {
    this.lawyerService.getAllLawyers().subscribe((response: ILawyer[]) => {
      this.lawyersList = response;
    });
  }

  ClickedLawyer(lawyer: ILawyer) {
    console.log(lawyer);
  }

  SaveUpdate() {
    this.GetAllLawyers();
  }
}

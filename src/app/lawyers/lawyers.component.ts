import { Component, OnInit } from '@angular/core';
import { ILawyer } from '../models/Lawyer.model';
import { LawyersService } from '../services/lawyers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
})
export class LawyersComponent implements OnInit {
  constructor(private lawyerService: LawyersService) {}

  public lawyersList: ILawyer[] = [];
  public selectedLawyer!: ILawyer;

  public editMode: boolean = false;

  ngOnInit(): void {
    this.GetAllLawyers();
    this.selectedLawyer = {
      LawyerID: 0,
      FullName: '',
      Speciality: '',
    };
  }

  GetAllLawyers() {
    this.lawyerService.getAllLawyers().subscribe((response: ILawyer[]) => {
      this.lawyersList = response;
    });
  }

  txtChangeName(e: any) {
    this.selectedLawyer.FullName = e.target.value;
  }
  txtChangeSpecility(e: any) {
    this.selectedLawyer.Speciality = e.target.value;
  }

  ClickedLawyer(lawyer: ILawyer) {
    this.selectedLawyer = lawyer;
  }
  EditCase(caseLawyer: ILawyer): void {
    this.editMode = true;

    this.selectedLawyer = {
      LawyerID: caseLawyer.LawyerID,
      FullName: caseLawyer.FullName,
      Speciality: caseLawyer.Speciality,
    };
  }
  NewLawyer(): void {
    this.editMode = false;
    this.selectedLawyer = {
      LawyerID: 0,
      FullName: this.selectedLawyer.FullName,
      Speciality: this.selectedLawyer.Speciality,
    };
    this.GetAllLawyers();
  }
  CloseModal(): void {
    this.selectedLawyer = {
      LawyerID: 0,
      FullName: '',
      Speciality: '',
    };
    this.GetAllLawyers();
  }

  DeleteCase(caseLawyer: ILawyer): void {
    Swal.fire({
      title: 'Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.lawyerService
          .deleteLawyer(caseLawyer.LawyerID)
          .subscribe((response) => {
            Swal.fire(response.message, '', 'error');
            this.GetAllLawyers();
          });
      } else if (result.isDenied) {
        Swal.fire('Caso no borrado', '', 'info');
      }
    });
  }
  SaveUpdate() {
    this.lawyerService
      .saveOrUpdateLawyer(this.selectedLawyer, this.editMode)
      .subscribe((response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });

    this.GetAllLawyers();
  }
}

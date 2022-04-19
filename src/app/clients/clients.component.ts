import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/Client.model';
import { ClientsService } from '../services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  constructor(private clientService: ClientsService) {}
  public clientList: IClient[] = [];
  public selectedClient!: IClient;
  public editMode: boolean = false;

  ngOnInit(): void {
    this.GetAllClients();

    this.selectedClient = {
      ClientID: 0,
      Firstname: '',
      Lastname: '',
      Email: '',
      PhoneNumber: '',
      IdentificationID: '',
      Phone: '',
      Address: '',
      MaritalStatusID: 1,
    };
  }

  GetAllClients() {
    this.clientService.getAllClients().subscribe((response: IClient[]) => {
      this.clientList = response;
    });
  }
  ClickedClient(client: IClient) {
    console.log(client);
  }
  DeleteCase(clientSelected: IClient): void {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService
          .deleteClient(clientSelected.ClientID)
          .subscribe((response) => {
            Swal.fire(response.message, '', 'error');
            this.GetAllClients();
          });
      } else if (result.isDenied) {
        Swal.fire('Caso no borrado', '', 'info');
      }
    });
    setTimeout(() => {
      this.GetAllClients();
    }, 5000);
  }
  NewCase(): void {
    this.editMode = false;
    this.selectedClient = {
      ClientID: 0,
      Firstname: '',
      Lastname: '',
      Email: '',
      PhoneNumber: '',
      IdentificationID: '',
      Phone: '',
      Address: '',
      MaritalStatusID: 1,
    };
  }
  EditCase(clientSelected: IClient): void {
    this.editMode = true;
    this.selectedClient = {
      ClientID: clientSelected.ClientID,
      Firstname: clientSelected.Firstname,
      Lastname: clientSelected.Lastname,
      Email: clientSelected.Email,
      PhoneNumber: clientSelected.PhoneNumber,
      IdentificationID: clientSelected.IdentificationID,
      Phone: clientSelected.Phone,
      Address: clientSelected.Address,
      MaritalStatusID: clientSelected.MaritalStatusID,
    };
  }
  SaveUpdate() {
    this.GetAllClients();
  }
  CloseModal(): void {
    this.selectedClient = {
      ClientID: 0,
      Firstname: '',
      Lastname: '',
      Email: '',
      PhoneNumber: '',
      IdentificationID: '',
      Phone: '',
      Address: '',
      MaritalStatusID: 1,
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { IClient } from '../models/Client.model';
import { ClientsService } from '../services/clients.service';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
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
    // this.GetAllClients();
    let maxData: number = 34;

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

    for (let i = 0; i < maxData; i++) {
      this.clientList.push({
        ClientID: i,
        Firstname: faker.name.findName(),
        Lastname: faker.name.lastName(),
        Email: faker.internet.email(),
        PhoneNumber: faker.phone.phoneNumber('+(829)-###-####'),
        IdentificationID: faker.phone.phoneNumber('###-#######-#'),
        Phone: faker.phone.phoneNumber('+(809)-###-####'),
        Address: `${faker.address.streetAddress()}, ${faker.address.state()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        MaritalStatusID: 1,
      });
    }
  }

  GetAllClients() {
    this.clientService.getAllClients().subscribe((response: IClient[]) => {
      this.clientList = response;
    });
  }

  DeleteClient(clientSelected: IClient): void {
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
  NewClient(): void {
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

  dllFirstnameChange(e: any): void {
    this.selectedClient.Firstname = e.target.value;
  }
  dllLastnameChange(e: any): void {
    this.selectedClient.Lastname = e.target.value;
  }
  dllIdentificationChange(e: any): void {
    this.selectedClient.IdentificationID = e.target.value;
  }
  dllAddressChange(e: any): void {
    this.selectedClient.Address = e.target.value;
  }
  dllMaritalChange(e: any): void {
    this.selectedClient.MaritalStatusID = e.target.value;
  }
  dllTelefonoChange(e: any): void {
    this.selectedClient.Phone = e.target.value;
  }
  dllCelularChange(e: any): void {
    this.selectedClient.PhoneNumber = e.target.value;
  }
  dllEmailChange(e: any): void {
    this.selectedClient.Email = e.target.value;
  }

  EditClient(clientSelected: IClient): void {
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

    this.clientService
      .saveOrUpdateCase(this.selectedClient, this.editMode)
      .subscribe((response) => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });

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
  CloseModal(): void {
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
}

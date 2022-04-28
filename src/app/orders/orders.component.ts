import { Component, OnInit } from '@angular/core';

import { IOrder } from '../models/Order.model';
import { IClient } from '../models/Client.model';
import { IFood } from '../models/Food.model';
import { faker } from '@faker-js/faker';
import { OrdersService } from '../services/orders.service';
import { ClientsService } from '../services/clients.service';
import { FoodService } from '../services/food.service';
import Swal from 'sweetalert2';
import axios from 'axios';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private clientsService: ClientsService,
    private foodService: FoodService
  ) {}

  public ordersList: IOrder[] = [];
  public foodList: IFood[] = [];
  public clientList: IClient[] = [];

  public selectedOrder!: IOrder;

  public editMode: boolean = false;
  public mealName: string[] = [
    'Battenberg Cake',
    'Cupcake',
    'Portuguese custard tarts',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
    'Seri muka kuih',
    'Corba',
    'Rocky Road Fudge',
    'Lamb tomato and sweet spices',
    'Spicy Arrabiata Penne',
    'BeaverTails',
    'Canadian Butter Tarts',
    'Portuguese prego with green piri-piri',
  ];

  ngOnInit(): void {
    // this.GetAllCases();

    let maxData: number = 12;

    this.ordersList = [];
    this.foodList = [];
    this.clientList = [];

    for (let i = 0; i < maxData; i++) {
      this.ordersList.push({
        OrderID: i,
        Date: faker.date.future(),
        Status: false,
        Address: `${faker.address.streetAddress()}, ${faker.address.state()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        Description: '',
        Food: this.mealName[i],
        Client: `${faker.name.findName()} ${faker.name.lastName()}`,
      });
    }
  }

  GetAllCases(): void {
    this.ordersService.getAllOrders().subscribe((response: IOrder[]) => {
      this.ordersList = response;
    });
  }

  changeLawyer(e: any) {
    this.selectedOrder.Food = parseInt(e.target.value);
  }
  changeClient(e: any) {
    this.selectedOrder.Client = parseInt(e.target.value);
  }
  changeStatus(e: any) {
    this.selectedOrder.Status = e.target.value;
  }
  changeDescription(e: any) {
    this.selectedOrder.Description = e.target.value;
  }
  changeAddress(e: any) {
    this.selectedOrder.Address = e.target.value;
  }

  EditCase(caseSelected: IOrder): void {
    this.editMode = true;

    this.selectedOrder = {
      OrderID: caseSelected.OrderID,
      Date: caseSelected.Date,
      Status: caseSelected.Status,
      Description: caseSelected.Description.toString(),
      Address: caseSelected.Address,
      Food: caseSelected.Food.FoodID,
      Client: caseSelected.Client.ClientID,
    };
  }
  NewCase(): void {
    this.editMode = false;

    this.selectedOrder = {
      OrderID: 0,
      Date: new Date(),
      Status: this.selectedOrder.Status,
      Description: this.selectedOrder.Description,
      Address: this.selectedOrder.Address,
      Food: this.selectedOrder.Food,
      Client: this.selectedOrder.Client,
    };
  }
  DeleteCase(orderSelected: IOrder): void {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService
          .deleteOrder(orderSelected.OrderID)
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
    this.ordersService
      .saveOrUpdateOrder(this.selectedOrder, this.editMode)
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
    this.selectedOrder = {
      OrderID: 0,
      Date: new Date(),
      Status: false,
      Description: '',
      Address: '',
      Food: '',
      Client: '',
    };
  }
}

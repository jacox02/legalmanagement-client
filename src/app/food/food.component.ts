import { Component, OnInit } from '@angular/core';
// import { ILawyer } from '../models/Lawyer.model';
import { FoodService } from '../services/food.service';
import Swal from 'sweetalert2';
import { IFood } from '../models/Food.model';
import { faker } from '@faker-js/faker';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
})
export class FoodComponent implements OnInit {
  constructor(private foodService: FoodService) {}

  public foodList: IFood[] = [];
  public selectedFood!: IFood;

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
    // this.GetAllLawyers();
    let maxData: number = 12;

    this.selectedFood = {
      FoodID: 0,
      FoodName: '',
      Price: 0,
      Description: '',
    };

    for (let i = 0; i < maxData; i++) {
      this.foodList.push({
        FoodID: i,
        FoodName: this.mealName[i],
        Price: faker.commerce.price(500, 2300, 0, '$'),
        Description: 'Food' + i,
      });
    }
  }

  GetAllLawyers() {
    this.foodService.getAllFood().subscribe((response: IFood[]) => {
      this.foodList = response;
    });
  }

  txtChangeFoodName(e: any) {
    this.selectedFood.FoodName = e.target.value;
  }
  txtChangeoPrice(e: any) {
    this.selectedFood.Price = e.target.value;
  }

  ClickedFood(foodSelected: IFood) {
    this.selectedFood = foodSelected;
  }
  EditFood(selectedFood: IFood): void {
    this.editMode = true;

    this.selectedFood = {
      FoodID: selectedFood.FoodID,
      FoodName: selectedFood.FoodName,
      Price: selectedFood.Price,
      Description: selectedFood.Description,
    };
  }
  NewLawyer(): void {
    this.editMode = false;
    this.selectedFood = {
      FoodID: this.selectedFood.FoodID,
      FoodName: this.selectedFood.FoodName,
      Price: this.selectedFood.Price,
      Description: this.selectedFood.Description,
    };
    this.GetAllLawyers();
  }
  CloseModal(): void {
    this.selectedFood = {
      FoodID: 0,
      FoodName: '',
      Price: 0,
      Description: '',
    };
    this.GetAllLawyers();
  }

  DeleteFood(selectedFood: IFood): void {
    Swal.fire({
      title: 'Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.foodService
          .deleteFoodr(selectedFood.FoodID)
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
    this.foodService
      .saveOrUpdateFoodr(this.selectedFood, this.editMode)
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

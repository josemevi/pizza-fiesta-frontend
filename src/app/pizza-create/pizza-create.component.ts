import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css']
})
export class PizzaCreateComponent implements OnInit {

  pizzaData: any = {
    name: "",
    description: "",
    ingredients : [],
    value: "",
    created_by: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

}

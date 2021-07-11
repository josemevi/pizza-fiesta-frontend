import { Component, OnInit } from '@angular/core';

@Component({
  
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})

export class PizzaDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deletePizza(id: any, name: any){
    
    confirm("¿Deseas borrar "+name+ " permanentemente?");

  }

}

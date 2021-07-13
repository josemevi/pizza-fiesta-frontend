import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { state } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lastPizzas: any = [];

  constructor(private router: Router,
    public sessionService: SessionService,
    private pizzasService: PizzasService) { }

  ngOnInit(): void {
    this.lastFourPizzas();
  }

  deletePizza(id: any, name: any): void{

    Swal.fire({
      title: '¿Estás Segur@?',
      text: "¡¿Borraras "+name+" permanentemente?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E2001A',
      cancelButtonColor: '#db5bd',
      confirmButtonText: 'Si, sin remordimientos',
      cancelButtonText: '¡No, Espera!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.pizzasService.deletePizza(id)
        .subscribe(response => {
          Swal.fire(
            '¡Pizza Eliminada!',
            name +' Será recordada para siempre.',
            'success'
          )
           this.lastFourPizzas();
        })
       
      }
    })

  }

  lastFourPizzas(): void{
    this.pizzasService.getPizzas()
    .subscribe(response => {

      this.lastPizzas = response.pizzaData;

      console.log(this.lastPizzas);

      if(this.lastPizzas.length > 4){
        this.lastPizzas = this.lastPizzas.slice(0, 3);
        console.log("Sliced array ->",this.lastPizzas);
      }

    })
  }

  addToCart(pizzaId: any): void {
    console.log(pizzaId);
  }

}

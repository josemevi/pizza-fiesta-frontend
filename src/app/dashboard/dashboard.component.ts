import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
import { CartService } from "../services/cart.service";

import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lastPizzas: any = [];

  constructor(private router: Router,
    public sessionService: SessionService,
    private pizzasService: PizzasService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.lastFourPizzas();
  }

  deletePizza(id: any, name: any): void{

    if(this.sessionService.validateSession()){

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
  
          this.pizzasService.deletePizza(id, this.sessionService.getSession().id)
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

  }

  lastFourPizzas(): void{
    this.pizzasService.getPizzas()
    .subscribe(response => {

      this.lastPizzas = response.pizzaData;

      if(this.lastPizzas.length > 4){
        this.lastPizzas = this.lastPizzas.slice(0, 4);
      }

    })
  }

  addToCart(pizzaId: any, pizzaName: any): void {

    if(this.sessionService.validateSession()){

      let cartData: any = {
        user_id : this.sessionService.getSession().id,
        pizza_id: pizzaId
      }

      this.cartService.createCartEntry(cartData)
        .subscribe(response => { 
          this.cartService.setChanges(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `¡${pizzaName} se ha agregado a tu cesta!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
      
      

    }
    
  }

}

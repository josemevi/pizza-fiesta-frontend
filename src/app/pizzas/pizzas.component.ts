import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
import { CartService } from "../services/cart.service";

import { Router } from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  pizzas: any = [];

  constructor(private router: Router,
    public sessionService: SessionService,
    private pizzasService: PizzasService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getPizzas();
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
             this.getPizzas();
          })
         
        }
      })

    }

  }

  getPizzas(): void{
    this.pizzasService.getPizzas()
    .subscribe(response => {

      this.pizzas = response.pizzaData;

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

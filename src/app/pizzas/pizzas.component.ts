import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
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
    private pizzasService: PizzasService) { }

  ngOnInit(): void {
    this.getPizzas();
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

        //ep aqui


        Swal.fire(
          '¡Pizza Eliminada!',
          name +' Será recordada para siempre.',
          'success'
        )
      }
    })

  }

  getPizzas(): void{
    this.pizzasService.getPizzas()
    .subscribe(response => {

      this.pizzas = response.pizzaData;

    })
  }

  addToCart(pizzaId: any): void {
    console.log(pizzaId);
  }

}

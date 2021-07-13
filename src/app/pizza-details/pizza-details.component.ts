import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'; 
@Component({
  
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})

export class PizzaDetailsComponent implements OnInit {

  pizza: any = [];
  lastPageUrl: String = "/"

  constructor(private router: Router,
    public sessionService: SessionService,
    private pizzasService: PizzasService,
    private activatedroute: ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedroute.paramMap.subscribe(params => {
        let id = +params.get('id');
        this.getPizzasById(id);
      });
      
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
  
    getPizzasById(id: any): void{
      this.pizzasService.getPizzaById(id)
      .subscribe(response => {
        console.log(response);
        this.pizza = response.pizzaData;
  
      })
    }
  
    addToCart(pizzaId: any): void {
      console.log(pizzaId);
    }
    
}

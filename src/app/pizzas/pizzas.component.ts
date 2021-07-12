import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deletePizza(id: any, name: any){

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

}

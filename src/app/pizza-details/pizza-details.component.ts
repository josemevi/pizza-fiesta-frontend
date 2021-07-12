import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  apiPath: String = environment.apiURL + "pizzas/"

  constructor(private http: HttpClient, 
              private router: Router) { }

  getPizzas(): Observable<any> {

    return this.http.get(`${this.apiPath}getPizzas.php`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }

  getPizzaById(id: any): Observable<any> {

    return this.http.get(`${this.apiPath}getPizzas.php?id=${id}`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }

  createPizza(pizzaData: any): Observable<any> {

    return this.http.post(`${this.apiPath}createPizza.php`, pizzaData).pipe(
      catchError(e => {
        console.error(e.error);
        if(e.error.status == 400){
          Swal.fire("Ups", "Parece que el nombre seleccionado ya se encuentra en uso, prueba con uno distinto", "error");
        }
        return throwError(e);
      })
    )
  }

  updatePizza(pizzaData: any): Observable<any> {

    return this.http.post(`${this.apiPath}updatePizza.php`, pizzaData).pipe(
      catchError(e => {
        console.error(e.error);
        if(e.error.status == 400){
          Swal.fire("Ups", "Parece que el nombre seleccionado ya se encuentra en uso, prueba con uno distinto", "error");
        }
        return throwError(e);
      })
    )
  }

  deletePizza(id: any, user_id: any): Observable<any> {
    console.log(`${this.apiPath}deletePizza.php?id=${id}`);
    return this.http.delete(`${this.apiPath}deletePizza.php?id=${id}&user_id=${user_id}`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }


}



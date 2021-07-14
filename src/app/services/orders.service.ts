import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiPath: String = environment.apiURL + "orders/"

  constructor(private http: HttpClient, 
    private router: Router) { }


  createOrder(orderData: any): Observable<any> {
  
    return this.http.post(`${this.apiPath}createOrder.php`, orderData).pipe( 
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )
  }


              
}

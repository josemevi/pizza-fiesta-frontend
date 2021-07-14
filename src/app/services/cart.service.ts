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
export class CartService {

  subject = new Subject();

  apiPath: String = environment.apiURL + "cart/"

  constructor(private http: HttpClient, 
    private router: Router) { }
  

  getUserCart(id: any): Observable<any> {

    return this.http.get(`${this.apiPath}getUserCart.php?id=${id}`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }

  getUserCartCounter(id: any): Observable<any> {

    return this.http.get(`${this.apiPath}getUserCartCount.php?id=${id}`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }

  createCartEntry(cartData: any): Observable<any> {
    
    return this.http.post(`${this.apiPath}createCartEntry.php`, cartData).pipe( 
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )
  }

  deleteCartEntry(id: any): Observable<any> {

    return this.http.get(`${this.apiPath}deleteCartEntry.php?id=${id}`).pipe(
      catchError(e => {
        console.error(e.error);
        return throwError(e);
      })
    )

  }

  setChanges(times: any): void {

    this.subject.next({text:times});

  }

  getChanges(): Observable<any> {

    return this.subject.asObservable();

  }

  


}

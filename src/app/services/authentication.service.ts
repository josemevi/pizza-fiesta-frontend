import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  apiPath: String = environment.apiURL + "users/"

  constructor(private http: HttpClient, 
              private router: Router) { }


  login(userData: any): Observable<any>{
    return this.http.post(`${this.apiPath}login.php`, userData).pipe(
      catchError(e => {
        console.error(e.error);
        if(e.error.status == 400){
          Swal.fire("Ups", "El nombre de usuario, email o contraseñas ingresados son incorrectos. Por favor intenta de nuevo.", "error");
        }
        return throwError(e);
      })
    )
  }

  register(userData: any): Observable<any>{
    
    return this.http.post(`${this.apiPath}register.php`, userData).pipe(
      catchError(e => {
        console.error(e.error);
        if(e.error.status == 400){
          Swal.fire("Ups", "El nombre de usuario o email ingresados ya estan en uso. Por favor prueba con uno distinto.", "error");
        }
        return throwError(e);
      })
    )
  }

  
}

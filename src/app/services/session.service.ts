import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  createSession(userData: any){

    sessionStorage.setItem("userData", JSON.stringify(userData))

  }

  getSession(): any{

    let session: any = sessionStorage.getItem("userData");

    if(session){
      session = JSON.parse(session);
    } 

    return session;

  }

  redirect(): void {
    Swal.fire("¿Quién eres?", "Debes identificarte antes de realizar algo","error");
    this.router.navigate(['/login']);
  }

  validateSession(): Boolean{
    let status = false;
      if(this.getSession()){
        status = true;
      }else {
        status = false;
        this.redirect();
      }
      return status;
  }

  deleteSession(): void{

    sessionStorage.clear();
    Swal.fire("Adiós","¡Esperamos volver a ver tus creaciones pronto!","info")
    this.router.navigate(['/login']);

  }


}

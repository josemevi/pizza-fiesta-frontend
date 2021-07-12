import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData: any = {
    username : "",
    email : "",
    password : "",
    phone : "",
    direction : ""
  }

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    public sessionService: SessionService) { }


  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.router.navigate(['/dashboard']);
      Swal.fire("Ya has iniciado sesión", "¿A dónde ibas?", "question");
    }
  }

  register(){
    
    if(this.userData.username && this.userData.password){
      this.authenticationService.register(this.userData)
        .subscribe(response => {
          Swal.fire("Ahora sí", "Inicia sesión para comenzar la fiesta", "success");
          this.router.navigate(['/login']);
        })

    }else {

      Swal.fire("Vaya...", "Parece que se te ha olvidado un campo del formulario.","error");

    }

  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userData: any = {
    username: "",
    password: ""
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

  login(){

    if(this.userData.username && this.userData.password){
      
      this.authenticationService.login(this.userData)
      .subscribe(response => {
        this.sessionService.createSession(response.userData);
        Swal.fire("Ahora sí", "Bienvenido " +response.userData.username+". ¿Que comemos hoy?", "success");
        this.router.navigate(['/dashboard']);
      })

    }else {
      Swal.fire("Vaya...", "Parece que se te ha olvidado un campo del formulario.","error");
    }
    
  }

}

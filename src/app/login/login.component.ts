import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { SessionService } from "../services/session.service";
import { CartService } from "../services/cart.service";
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
    public sessionService: SessionService,
    private cartService: CartService) { }
    

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
        Swal.fire("Ahora sí", "Bienvenido " +response.userData.username+". ¿Qué comemos hoy?", "success");
        this.router.navigate(['/dashboard']);
        this.cartService.setChanges(true);
      })

    }else {
      Swal.fire("Vaya...", "Parece que se te ha olvidado un campo del formulario.","error");
    }
    
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.login();
    }
  }

}

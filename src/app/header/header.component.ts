import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from "../services/session.service";
//import { AuthService  } from "../usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    


    constructor(private router: Router,
                public sessionService: SessionService){

    }


    logout(){

        Swal.fire({
            title: '¿Te vas tan pronto?',
            text: "¡Apenas estabamos empezando!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E2001A',
            cancelButtonColor: '#db5bd',
            confirmButtonText: 'Si, deje la estufa encendida',
            cancelButtonText: '¡No, Espera!'
          }).then((result) => {
            if (result.isConfirmed) {
      
                this.sessionService.deleteSession();
            }
          })
        
      }
 
}


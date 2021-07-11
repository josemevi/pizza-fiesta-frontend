import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { AuthService  } from "../usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    title: string = 'App Angular'

    constructor(private router: Router){

    }

    // logout(): void{
    //     Swal.fire("Has Cerrado Sesión", `Adios ${this.authService.usuario.username}`, "success");
    //     this.authService.logout();        
    //     this.router.navigate(['/login']);
    // }
 
}


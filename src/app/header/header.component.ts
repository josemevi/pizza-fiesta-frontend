import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';
import Swal from 'sweetalert2';

import {
    SessionService
} from "../services/session.service";
import {
    CartService
} from "../services/cart.service";
import {
    OrdersService
} from "../services/orders.service";
//import { Au
//import { AuthService  } from "../usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    cartCounter: number = 0;
    cartData: any = [];
    total: number = 0;

    constructor(private router: Router,
        public sessionService: SessionService,
        private cartService: CartService,
        private ordersService: OrdersService) {}

    ngOnInit() {
        this.getCartCounter();
        this.cartService.getChanges().subscribe(() => {
            this.getCartCounter();
        })
    }

    logout() {

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

    getCart() {

        this.total = 0;

        let session = this.sessionService.getSession();
        if (session) {

            this.cartService.getUserCart(session.id)
                .subscribe(response => {
                    let data = response.cartData;
                    this.cartData = data;

                    for (let i = 0; i < data.length; i++) {
                        this.total += data[i].quantity * data[i].value;
                    }

                })
        }
    }

    getCartCounter() {

        let session = this.sessionService.getSession();
        if (session) {

            this.cartService.getUserCartCounter(session.id)
                .subscribe(response => {

                    this.cartCounter = response.cartData.num_items ? response.cartData.num_items : 0;

                })

        }
    }

    removeItem(id: any, name: String, total: any) {

        Swal.fire({
            title: '¿Estas Segur@?',
            text: "¿Eliminar "+name + " que tiene un total de "+total+"€?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#E2001A',
            cancelButtonColor: '#db5bd',
            confirmButtonText: '¡Qué Si!',
            cancelButtonText: '¡No, Espera!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.cartService.deleteCartEntry(id)
                .subscribe(response => {
                    this.cartService.setChanges(true);
                    this.getCart();
                })
            }
        })

    

        

    }

    createOrder(): void {

        if(this.cartData.length > 0){

            Swal.fire({
                title: '¿Deseas realizar el pedido?',
                text: "¡A solo un paso de probar la gloria!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#E2001A',
                cancelButtonColor: '#db5bd',
                confirmButtonText: 'Si, Pagar',
                cancelButtonText: '¡No, Espera!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let data = {
                        user_id : this.sessionService.getSession().id
                    }
                    this.ordersService.createOrder(data)
                        .subscribe(response => {
                            this.cartService.setChanges(true);
                            this.getCart();
                            Swal.fire("¡VAMOS!","Tu pedido ha sido registrado con éxito, te contactaremos al instante :)","success");
                        })
                }
            })

        }else {
            Swal.fire("Ups", "Para realizar un pedido al menos debes registrar una pizza ;)","error");
        }
       

       

    }


}
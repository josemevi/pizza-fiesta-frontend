import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.userData);
  }

}

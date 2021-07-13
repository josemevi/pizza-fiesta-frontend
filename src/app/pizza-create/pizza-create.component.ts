import { Component, OnInit } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { SessionService } from "../services/session.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css']
})
export class PizzaCreateComponent implements OnInit {

  ingredient: String = "";
  editing: Boolean = false;

  pizzaData: any = {
    pizza_id: "",
    name: "",
    description: "",
    ingredients : [],
    value: "",
    photo : "",
    created_by: "",
  }

  constructor(private router: Router,
    public sessionService: SessionService,
    private pizzasService: PizzasService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.pizzaData.pizza_id = id;
        this.getPizzasById(id);
        this.editing = true;
      }
      
    });
  }

  getPizzasById(id: any): void{
    this.pizzasService.getPizzaById(id)
    .subscribe(response => {

      this.pizzaData.name = response.pizzaData.name;
      this.pizzaData.description = response.pizzaData.description;
      this.pizzaData.value = response.pizzaData.value;
      this.pizzaData.photo = response.pizzaData.photo;
      this.pizzaData.created_by = response.pizzaData.created_by;


      if(this.pizzaData.ingredients){
        this.pizzaData.ingredients = response.pizzaData.ingredients.split(",");
      }else {
        this.pizzaData.ingredients = [];
      }

    })
  }

  create() {

    if(this.pizzaData.name && this.pizzaData.ingredients && this.pizzaData.value){

      if(this.sessionService.validateSession()){
        this.pizzaData.created_by = this.sessionService.getSession().id;
      }else {
        return;
      }
      
      this.pizzasService.createPizza(this.pizzaData)
        .subscribe(response =>{
          
          Swal.fire("¡Pizza creada con éxito!","Tu obra maestra ha sido registrada", "success");
          this.router.navigate(['/pizzas']);

        })

    }else {

      Swal.fire("Vaya...", "Parece que se te ha olvidado un campo del formulario.","error");

    }

  }

  edit(): void{ 

    if(this.pizzaData.name && this.pizzaData.ingredients && this.pizzaData.value){

      if(this.sessionService.validateSession()){
        this.pizzaData.updated_by = this.sessionService.getSession().id;
      }else {
        return;
      }

      this.pizzasService.updatePizza(this.pizzaData)
        .subscribe(response =>{
          
          Swal.fire("¡Pizza editada con éxito!","Tu obra maestra ha sido modificada", "success");
          this.router.navigate(['/pizzas']);

        })      




    }
  }

  addIngredient(): void{

    this.ingredient = this.ingredient.toLowerCase();
    if(this.ingredient){
      if(!this.searchIngredient(this.ingredient, this.pizzaData.ingredients)){
        this.pizzaData.ingredients.push(this.ingredient);
        this.ingredient = "";
      }
      

    }
  }

  searchIngredient(ingredient: String, array: String[]): Boolean{

    let find: Boolean = false;

    if(array.indexOf(ingredient) > -1){
      find = true;
    }else {
      find = false;
    }

    return find;
  }

  removeIngredient(ingredient: String): void{

    this.pizzaData.ingredients.splice(ingredient, 1);

  }

  onKeydown(event): void {
    if (event.key === "Enter") {
      this.addIngredient();
    }
  }

}

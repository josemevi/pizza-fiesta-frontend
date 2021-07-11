import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.css']
})
export class PizzaCreateComponent implements OnInit {

  ingredient: String = "";

  pizzaData: any = {
    name: "",
    description: "",
    ingredients : [],
    value: "",
    photo : "",
    created_by: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

  create() {

    console.log(this.pizzaData);

  }

  addIngredient(){

    this.ingredient = this.ingredient.toLowerCase();
    if(this.ingredient){
      if(!this.searchIngredient(this.ingredient, this.pizzaData.ingredients)){
        this.pizzaData.ingredients.push(this.ingredient);
        this.ingredient = "";
      }
      

    }
  }

  searchIngredient(ingredient: String, array: String[]){

    let find: Boolean = false;

    if(array.indexOf(ingredient) > -1){
      find = true;
    }else {
      find = false;
    }

    return find;
  }

  removeIngredient(ingredient: String){

    this.pizzaData.ingredients.splice(ingredient, 1);

  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.addIngredient();
    }
  }

}

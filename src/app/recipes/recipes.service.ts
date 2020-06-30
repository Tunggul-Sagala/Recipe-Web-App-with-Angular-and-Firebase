import { Recipe } from './recipe.model';
import { Inggredient } from '../shared/inggredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

export class RecipesService {
    
    recipesChanged =new Subject<Recipe[]>();

    // private recipes:Recipe[] =[
    //     new Recipe(
    //     "Sambal Balado", 
    //     "Wellknown delicious recipe", 
    //     "https://cf.shopee.co.id/file/5f1de6bc1fc6d597ac4afb0e980888bc",
    //     [
    //         new Inggredient('Eggs', 10),
    //         new Inggredient('Tomatoes', 5),
    //         new Inggredient('Vegetable', 1)
    //     ]),
    //     new Recipe(
    //     "Nasi Goreng", 
    //     "Exotic fried rice recipe", 
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKxdqvvEmx6VeAKjOs5FvgVFD2RkkrxvcJawndqRaOKGrCOt1W&usqp=CAU",
    //     [
    //         new Inggredient('Rice', 1000),
    //         new Inggredient('Shrimps', 5),
    //         new Inggredient('Egg', 1)
    //     ]),
    //     new Recipe(
    //     "Mie Ayam",
    //     "Noodles and Chicken Meat",
    //     "https://www.masakapahariini.com/wp-content/uploads/2019/08/mie-ayam-kecap-620x440.jpg",
    //     [
    //         new Inggredient('Noodle', 300),
    //         new Inggredient('Chicken Meat', 10),
    //         new Inggredient('Fresh Vegetable', 2)
    //     ]
    //     )
    // ];

    private recipes:Recipe[] =[];

    constructor(private slService:ShoppingListService) {}

    setRecipes(recipes:Recipe[]) {
        this.recipes =recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index:number) {
        return this.recipes[index];
    }

    addInggredientsToShoppingList(inggredients:Inggredient[]) {
        this.slService.addInggredients(inggredients);
    }

    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe) {
        this.recipes[index] =newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
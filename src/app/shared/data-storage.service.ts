import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

    private url ='https://ng-fullstack.firebaseio.com/recipes.json';

    constructor(private http:HttpClient, private recipesService:RecipesService) {}

    storeRecipes() {
        const recipes =this.recipesService.getRecipes();
        this.http.put(this.url, recipes).subscribe(
            response => {
                console.log(response);
            }
        )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.url)
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, inggredients: recipe.inggredients ? recipe.inggredients : []};
            });
        }), tap(recipes => {
            this.recipesService.setRecipes(recipes);
        }));
    }
}
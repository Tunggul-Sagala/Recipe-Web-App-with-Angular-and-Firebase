import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService:DataStorageService,
                private recipesService:RecipesService) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        const recipes =this.recipesService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}
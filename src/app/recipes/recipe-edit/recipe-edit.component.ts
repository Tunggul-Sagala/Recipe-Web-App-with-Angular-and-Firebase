import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode =false;
  id:number;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, 
              private recipesService:RecipesService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode =params['id'] !=null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeInggredients =new FormArray([]);

    if (this.editMode) {
      let recipe =this.recipesService.getRecipe(this.id);
      recipeName =recipe.name;
      recipeImagePath =recipe.imagePath;
      recipeDescription =recipe.description;

      if (recipe['inggredients']) {
        for (let inggredient of recipe.inggredients) {
          recipeInggredients.push(
            new FormGroup({
              'name': new FormControl(inggredient.name, Validators.required),
              'amount': new FormControl(inggredient.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm =new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'inggredients': recipeInggredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddInggredient() {
    (<FormArray>this.recipeForm.get('inggredients')).push(
      new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [
            Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }
      )
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteInggredient(index:number) {
    (<FormArray>this.recipeForm.get('inggredients')).removeAt(index);
  }

  getControls() {
    return (this.recipeForm.get('inggredients')as FormArray).controls;
  }

}

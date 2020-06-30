import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Inggredient } from 'src/app/shared/inggredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f', {static:false}) slForm:NgForm;
  subscription:Subscription;
  editedItemIndex:number;
  editedItem:Inggredient;
  editMode =false;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription =this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex =index;
        this.editMode =true;
        this.editedItem =this.slService.getInggredient(this.editedItemIndex);
        this.slForm.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        );
      }
    );
  }

  onSubmit(form:NgForm) {
    const value =form.value;
    const newInggredient =new Inggredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateInggredients(this.editedItemIndex, newInggredient);
    } else {
      this.slService.addInggredient(newInggredient);
    }
    this.editMode =false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode =false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteInggredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

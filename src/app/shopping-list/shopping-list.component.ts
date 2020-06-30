import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inggredient } from '../shared/inggredient';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  inggredients:Inggredient[];
  private igChangedSub:Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.inggredients =this.slService.getInggredients();
    this.igChangedSub =this.slService.inggredientsChanged.subscribe(
      (inggredients:Inggredient[]) => {
        this.inggredients =inggredients;
      }
    );
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number) {
    this.slService.startedEditing.next(index);
  }
}

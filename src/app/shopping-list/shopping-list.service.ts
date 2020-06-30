import { Inggredient } from '../shared/inggredient';
import { Subject } from 'rxjs';

export class ShoppingListService {
    
    inggredientsChanged =new Subject<Inggredient[]>();
    startedEditing =new Subject<number>();

    private inggredients:Inggredient[] =[
        new Inggredient('Garlic', 3),
        new Inggredient('Shallot', 2),
        new Inggredient('Chili', 3),
        new Inggredient('Ginger', 1)
    ];
    
    getInggredients() {
        return this.inggredients.slice();
    }

    getInggredient(index:number) {
        return this.inggredients[index];
    }

    addInggredient(inggredient:Inggredient) {
        this.inggredients.push(inggredient);
        this.inggredientsChanged.next(this.inggredients.slice());
    }

    addInggredients(inggredients:Inggredient[]) {
        this.inggredients.push(...inggredients);
        this.inggredientsChanged.next(this.inggredients.slice());
    }

    updateInggredients(index:number, newInggredient:Inggredient) {
        this.inggredients[index] =newInggredient;
        this.inggredientsChanged.next(this.inggredients.slice());
    }

    deleteInggredient(index:number) {
        this.inggredients.splice(index, 1);
        this.inggredientsChanged.next(this.inggredients.slice());
    }
}
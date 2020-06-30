import { Inggredient } from '../shared/inggredient';

export class Recipe {
    public name:string;
    public description:string;
    public imagePath:string;
    public inggredients:Inggredient[];

    constructor(name:string, description:string, imagePath:string, inggredients:Inggredient[]) {
        this.name =name;
        this.description =description;
        this.imagePath =imagePath;
        this.inggredients =inggredients;
    }
}
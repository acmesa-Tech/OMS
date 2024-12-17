class Sandwich {
    constructor(size, bread, ingredient, cheese, toppings = []) {
        this.size = size;
        this.bread = bread;
        this.ingredient = ingredient;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    getSandwichDescription() {
        const toppingsList = this.toppings.length > 0 ? ` with ${this.toppings.join(", ")}` : "";
        return `${this.size} ${this.bread} ${this.ingredient} with ${this.cheese}${toppingsList}`;
    }
}
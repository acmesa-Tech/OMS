class Order {
    constructor(customer, sandwich, drink = null, side = null) {
        this.customer = customer;
        this.sandwich = sandwich;
        this.drink = drink;
        this.side = side;
    }

    getOrderDescription() {
        return `${this.customer}: ${this.sandwich}, Drink: ${this.drink || 'None'}, Side: ${this.side || 'None'}`;
    }

    createOrderElement() {
        const orderElement = document.createElement("div");
        orderElement.innerText = this.getOrderDescription();
        orderElement.classList.add("order-card");
        return orderElement;
    }
}

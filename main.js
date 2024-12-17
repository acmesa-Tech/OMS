let orderNumber = 1;
const orders = [];

// Store the timeouts for each order 
const orderTimeouts = {};

document.getElementById("place-order").addEventListener("click", function () {
    const customerName = document.getElementById("customer-name").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const size = document.querySelector('input[name="size"]:checked')?.value;
    const bread = document.querySelector('input[name="bread"]:checked')?.value;
    const ingredient = document.querySelector('input[name="ingredient"]:checked')?.value;
    const cheese = document.getElementById("cheese").value;

    // Get drinks and sides
    const drinks = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).filter(item => {
        const fieldset = item.closest("fieldset");
        return fieldset && fieldset.querySelector("legend").innerText === "Drinks";
    });

    const sides = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).filter(item => {
        const fieldset = item.closest("fieldset");
        return fieldset && fieldset.querySelector("legend").innerText === "Sides";
    });

    if (!customerName || !phoneNumber || !size || !bread || !ingredient) {
        alert("Required information is empty");
        return;
    }

    // Increment orderNumber and create order
    const timePlaced = new Date();
    const order = {
        number: orderNumber++,
        customer: `${customerName} - ${phoneNumber}`,
        sandwich: `${size} ${bread} ${ingredient} with ${cheese}`,
        drinks: drinks.map(drink => drink.value),
        sides: sides.map(side => side.value),
        timePlaced,
        status: "new"
    };

    orders.push(order);
    document.getElementById("order-number").innerText = orderNumber;
    addOrderToColumn(order);

    // Reset form fields
    document.getElementById("order-form").reset();
    document.getElementById("customer-name").value = '';
    document.getElementById("phone-number").value = '';
});

function addOrderToColumn(order) {
    const orderElement = document.createElement("button");
    orderElement.innerText = `${order.number}: ${order.sandwich}`;
    orderElement.classList.add("order-card");
    orderElement.addEventListener("dblclick", () => completeOrder(order, orderElement));

    document.getElementById("new-orders").appendChild(orderElement);

    // Move to Waiting after 20 seconds
    const toWaitingTimeout = setTimeout(() => moveOrder(order, "waiting", orderElement), 20000);
    orderTimeouts[order.number] = toWaitingTimeout; // Store the timeout for the order
}

function moveOrder(order, newStatus, orderElement) {
    // If the order has been completed, don't move it further
    if (order.status === "completed") return;

    order.status = newStatus;

    if (newStatus === "waiting") {
        document.getElementById("waiting-orders").appendChild(orderElement);
        const toHurryTimeout = setTimeout(() => moveOrder(order, "hurry", orderElement), 10000); // Move to Hurry Up after 10 seconds
        orderTimeouts[order.number] = toHurryTimeout; // Update the timeout for the next step
    } else if (newStatus === "hurry") {
        document.getElementById("hurry-orders").appendChild(orderElement);
    }
}

function completeOrder(order, orderElement) {
    const timeCompleted = new Date();
    const timeElapsed = (timeCompleted - order.timePlaced) / 1000;
    const formattedTimeElapsed = `${Math.floor(timeElapsed / 60)} min ${Math.floor(timeElapsed % 60)} sec`;

    const hasDrinks = order.drinks.length > 0;
    const hasSides = order.sides.length > 0;
    let completionMessage = "";
    if (hasDrinks && hasSides) {
        completionMessage = ", include Drink and Side";
    } else if (hasDrinks) {
        completionMessage = ", include Drink";
    } else if (hasSides) {
        completionMessage = ", include Side";
    }

    const completedElement = document.createElement("li");
    completedElement.innerText = `${order.number}: ${order.sandwich}${completionMessage} - Completed at ${timeCompleted.toLocaleString()}, Duration: ${formattedTimeElapsed}`;

    // Remove order from fulfillment section
    orderElement.remove();

    // Mark the order as completed
    order.status = "completed";

    // Clear the timeout to prevent the order from moving to another status
    clearTimeout(orderTimeouts[order.number]);

    // Remove the order from the timeout tracking
    delete orderTimeouts[order.number];

    // Add to completed orders list
    document.getElementById("completed-orders").prepend(completedElement);
}
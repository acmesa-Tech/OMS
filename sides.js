class Side {
    constructor(type) {
        this.type = type;
    }

    getSideDescription() {
        return this.type;
    }
}

/*
class Sides {
    constructor(sideType) {
        this.sideType = sideType;
    }

    createHTMLElement() {
        const sidesDiv = document.createElement('div');
        sidesDiv.innerText = `Side: ${this.sideType}`;
        return sidesDiv;
    }
}
*/
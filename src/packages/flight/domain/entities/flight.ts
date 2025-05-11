export interface FlightProps {
    id: string;
    itinerary: Itinerary;
}

export interface Itinerary {
    price: {
        formatted: string;
        pricingOptionId: string;
        raw: number;
    };
    [key: string]: any;
}

const DISCOUNT_RATE = 0.10;

export class Flight {
    public id: string;
    public itinerary: Itinerary;

    constructor(flight: FlightProps) {
        this.id = flight.id;
        this.itinerary = flight.itinerary;
    }

    applyDiscount(): void {
        this.itinerary.price.raw = this.itinerary.price.raw * (1 - DISCOUNT_RATE);

        this.itinerary.price.formatted = `$${Math.ceil(this.itinerary.price.raw)}`;
    }
}



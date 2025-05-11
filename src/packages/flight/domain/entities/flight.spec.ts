import { Flight, FlightProps } from '@flight/domain/entities/flight';

describe('@flight/domain/entities/flight', () => {
    let flight: Flight;
    let flightProps: FlightProps;

    beforeEach(() => {
        flightProps = {
            id: 'test-id',
            itinerary: {
                price: {
                    formatted: '$100',
                    pricingOptionId: 'test-pricing-option-id',
                    raw: 100.1
                },
            },
        };
    });

    describe('#constructor', () => {
        it('should create a Flight instance with provided props', () => {
            flight = new Flight(flightProps);

            expect(flight.id).toBe(flightProps.id);
            expect(flight.itinerary).toBe(flightProps.itinerary);
        });
    });

    describe('#applyDiscount', () => {
        it('should apply discount to the itinerary price and round up formatted price', () => {
            flight = new Flight(flightProps);

            flight.applyDiscount();

            expect(flight.itinerary.price.raw).toBe(90.09);
            expect(flight.itinerary.price.formatted).toBe('$91');
        });
    });
});
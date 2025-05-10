import { Flight, FlightProps } from '@flight/domain/entities/flight';

describe('@flight/domain/entities/flight', () => {
    let flight: Flight;
    let flightProps: FlightProps;

    beforeEach(() => {
        flightProps = {
            accommodations: {
                buckets: [],
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                results: []
            },
            brandCarousel: {
                buckets: null,
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                results: []
            },
            brandInlines: {
                buckets: null,
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                results: []
            },
            carHire: {
                buckets: [],
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                results: []
            },
            context: {
                sessionId: 'test-session',
                status: 'success'
            },
            itineraries: {
                agents: null,
                alliances: null,
                buckets: [],
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                creatives: null,
                destinationImageUrl: 'https://example.com/image.jpg',
                filterStats: null,
                results: []
            },
            packages: {
                buckets: null,
                context: {
                    sessionId: 'test-session',
                    status: 'success',
                    totalResults: 0
                },
                results: []
            },
            token: 'test-token'
        };
    });

    describe('#constructor', () => {
        it('should create a Flight instance with provided props', () => {
            flight = new Flight(flightProps);

            expect(flight.accommodations).toBe(flightProps.accommodations);
            expect(flight.brandCarousel).toBe(flightProps.brandCarousel);
            expect(flight.brandInlines).toBe(flightProps.brandInlines);
            expect(flight.carHire).toBe(flightProps.carHire);
            expect(flight.context).toBe(flightProps.context);
            expect(flight.itineraries).toBe(flightProps.itineraries);
            expect(flight.packages).toBe(flightProps.packages);
            expect(flight.token).toBe(flightProps.token);
        });
    });

    describe('#applyDiscount', () => {
        it('should throw error as method is not implemented', () => {
            flight = new Flight(flightProps);

            expect(() => flight.applyDiscount()).toThrow('Not implemented');
        });
    });
});
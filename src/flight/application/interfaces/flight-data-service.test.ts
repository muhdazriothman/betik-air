import { IFlightDataService, FlightSearchParams } from '@flight/application/interfaces/flight-data-service';
import { Flight, FlightProps } from '@flight/domain/entities/flight';

describe('@flight/application/interfaces/flight-data-service', () => {
    let flightDataService: IFlightDataService;

    beforeEach(() => {
        // Mock implementation of IFlightDataService
        flightDataService = {
            searchFlight: jest.fn(),
        };
    });

    describe('#searchFlight', () => {
        it('should return a Flight object when valid search params are provided', async () => {
            const searchParams: FlightSearchParams = {
                departureDate: '01-01-2024',
                returnDate: '02-01-2024',
                origin: 'KUL',
                originId: 'KUL123',
                destination: 'SIN',
                destinationId: 'SIN456',
            };

            const flightProps: FlightProps = {
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

            const flight = new Flight(flightProps);
            jest.spyOn(flightDataService, 'searchFlight').mockResolvedValue(flight);

            const result = await flightDataService.searchFlight(searchParams);

            expect(result).toBeInstanceOf(Flight);
            expect(flightDataService.searchFlight).toHaveBeenNthCalledWith(1, searchParams);
        });

        it('should throw an error when search fails', async () => {
            const searchParams: FlightSearchParams = {
                departureDate: '01-01-2024',
                returnDate: '02-01-2024',
                origin: 'KUL',
                originId: 'KUL123',
                destination: 'SIN',
                destinationId: 'SIN456',
            };

            const error = new Error('Search failed');
            jest.spyOn(flightDataService, 'searchFlight').mockRejectedValue(error);

            await expect(flightDataService.searchFlight(searchParams)).rejects.toThrow('Search failed');
            expect(flightDataService.searchFlight).toHaveBeenNthCalledWith(1, searchParams);
        });
    });
});
import { IFlightDataService, FlightSearchParams } from '@flight/application/interfaces/flight-data-service';

import { Flight, FlightProps } from '@flight/domain/entities/flight';
import { FlightDestination } from '@flight/domain/entities/flight-destination';

describe('@flight/application/interfaces/flight-data-service', () => {
    let flightDataService: IFlightDataService;

    beforeEach(() => {
        // Mock implementation of IFlightDataService
        flightDataService = {
            searchFlight: jest.fn(),
            getFlightDestinations: jest.fn(),
        };
    });

    describe('#searchFlight', () => {
        it('should return Flight data', async () => {
            const searchParams: FlightSearchParams = {
                departureDate: '01-01-2024',
                returnDate: '02-01-2024',
                origin: 'KUL',
                originId: 'KUL123',
                destination: 'SIN',
                destinationId: 'SIN456',
            };

            const flightProps: FlightProps = {
                id: 'test-id',
                itinerary: {
                    price: {
                        formatted: '100',
                        pricingOptionId: 'test-pricing-option-id',
                        raw: 100
                    }
                },
            };

            const flight = new Flight(flightProps);
            jest.spyOn(flightDataService, 'searchFlight').mockResolvedValue([flight]);

            const result = await flightDataService.searchFlight(searchParams);

            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toBeInstanceOf(Flight);
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

    describe('#getFlightDestinations', () => {
        it('should return flight destinations data', async () => {
            const flightDestinations: FlightDestination[] = [
                {
                    locationId: '27537542',
                    locationName: 'New York',
                    locationCode: 'NYCA'
                },
                {
                    locationId: '95565059',
                    locationName: 'New York Newark',
                    locationCode: 'EWR'
                }
            ];

            jest.spyOn(flightDataService, 'getFlightDestinations').mockResolvedValue(flightDestinations);

            const result = await flightDataService.getFlightDestinations();

            expect(result).toEqual(flightDestinations);
            expect(flightDataService.getFlightDestinations).toHaveBeenNthCalledWith(1);
        });

        it('should throw an error when getFlightDestinations fails', async () => {
            const error = new Error('Get flight destinations failed');
            jest.spyOn(flightDataService, 'getFlightDestinations').mockRejectedValue(error);

            await expect(flightDataService.getFlightDestinations()).rejects.toThrow('Get flight destinations failed');
            expect(flightDataService.getFlightDestinations).toHaveBeenNthCalledWith(1);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';

import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';
import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { GetFlightDestinationUseCase } from '@flight/application/use-cases/get-flight-destination';

import { Flight } from '@flight/domain/entities/flight';

describe('@flight/interfaces/http/flight/controllers/flight', () => {
    let controller: FlightController;
    let searchFlightUseCase: jest.Mocked<SearchFlightUseCase>;
    let getFlightDestinationUseCase: jest.Mocked<GetFlightDestinationUseCase>;

    beforeEach(async () => {
        searchFlightUseCase = {
            execute: jest.fn(),
        } as any;

        getFlightDestinationUseCase = {
            execute: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [FlightController],
            providers: [
                {
                    provide: SearchFlightUseCase,
                    useValue: searchFlightUseCase,
                },
                {
                    provide: GetFlightDestinationUseCase,
                    useValue: getFlightDestinationUseCase,
                },
            ],
        }).compile();

        controller = module.get<FlightController>(FlightController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('#searchFlight', () => {
        it('should call searchFlightUseCase.execute with query params', async () => {
            const query = {
                departureDate: '20-03-2024',
                returnDate: '25-03-2024',
                origin: 'KUL',
                originId: '1',
                destination: 'SIN',
                destinationId: '2',
            };

            const mockFlight = {} as Flight;
            searchFlightUseCase.execute.mockResolvedValue(mockFlight);

            const result = await controller.searchFlight(query);

            expect(searchFlightUseCase.execute).toHaveBeenCalledWith(query);
            expect(result).toBe(mockFlight);
        });
    });

    describe('#getFlightDestination', () => {
        it('should call getFlightDestinationUseCase.execute', async () => {

            const mockFlightDestinations = [
                {
                    locationId: '1',
                    locationName: 'New York',
                    locationCode: 'NYC',
                },
            ];

            getFlightDestinationUseCase.execute.mockResolvedValue(mockFlightDestinations);

            const result = await controller.getFlightDestination();

            expect(getFlightDestinationUseCase.execute).toHaveBeenCalled();
            expect(result).toBe(mockFlightDestinations);
        });
    });
});

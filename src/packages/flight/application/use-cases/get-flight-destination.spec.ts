import { Test, TestingModule } from '@nestjs/testing';

import { GetFlightDestinationUseCase } from '@flight/application/use-cases/get-flight-destination';

import { IFlightDataService } from '@flight/application/interfaces/flight-data-service';

describe('@flight/application/use-cases/get-flight-destination', () => {
    let useCase: GetFlightDestinationUseCase;
    let mockFlightDataService: jest.Mocked<IFlightDataService>;

    beforeEach(async () => {
        // TODO: Update mock when actual response body is known
        mockFlightDataService = {
            searchFlight: jest.fn(),
            getFlightDestinations: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetFlightDestinationUseCase,
                {
                    provide: 'IFlightDataService',
                    useValue: mockFlightDataService,
                },
            ],
        }).compile();

        useCase = module.get<GetFlightDestinationUseCase>(GetFlightDestinationUseCase);
    });

    describe('#execute', () => {
        it('should successfully get flight destinations', async () => {
            const mockFlightDestinations = [
                {
                    locationId: '1',
                    locationName: 'New York',
                    locationCode: 'NYC',
                },
            ];

            mockFlightDataService.getFlightDestinations.mockResolvedValue(mockFlightDestinations);

            const result = await useCase.execute();

            expect(result).toBe(mockFlightDestinations);
        });
    });
});
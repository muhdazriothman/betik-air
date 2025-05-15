import { Test, TestingModule } from '@nestjs/testing';

import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';
import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { FlightMapper } from '@flight/interfaces/http/flight/mappers/flight';

import { FlightFixture } from '@test/fixture/flight';
import { Flight } from '@flight/domain/entities/flight';

describe('@flight/interfaces/http/flight/controllers/flight', () => {
    let controller: FlightController;
    let searchFlightUseCase: jest.Mocked<SearchFlightUseCase>;

    beforeEach(async () => {
        searchFlightUseCase = {
            execute: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [FlightController],
            providers: [
                {
                    provide: SearchFlightUseCase,
                    useValue: searchFlightUseCase,
                }
            ],
        }).compile();

        controller = module.get<FlightController>(FlightController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    let toListDtoSpy: jest.SpyInstance;

    const flights: Flight[] = [FlightFixture.getFlightEntity({})];

    describe('#searchFlight', () => {
        beforeEach(() => {
            toListDtoSpy = jest.spyOn(FlightMapper, 'toListDto');
        });

        it('should call searchFlightUseCase.execute with query params', async () => {
            const query = {
                departureDate: '20-03-2024',
                returnDate: '25-03-2024',
                origin: 'KUL',
                originId: '1',
                destination: 'SIN',
                destinationId: '2',
            };


            searchFlightUseCase.execute.mockResolvedValue(flights);

            const result = await controller.searchFlight(query);

            expect(searchFlightUseCase.execute).toHaveBeenCalledWith(query);
            expect(toListDtoSpy).toHaveBeenCalledWith(flights);

            const expectedResponse = toListDtoSpy.mock.results[0].value;

            expect(result).toBe(expectedResponse);
        });
    });
});

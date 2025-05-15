import { Test } from '@nestjs/testing';
import { FlightModule } from '@modules/flight';
import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';
import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { FlightServiceImpl } from '@flight/infra/services/flight-api';

describe('@modules/flight', () => {
    let moduleRef: any;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [FlightModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(moduleRef).toBeDefined();
    });

    describe('imports', () => {
        it('should have empty imports', () => {
            const metadata = Reflect.getMetadata('imports', FlightModule);
            expect(metadata).toEqual([]);
        });
    });

    it('should have FlightController', () => {
        const controller = moduleRef.get(FlightController);
        expect(controller).toBeDefined();
    });

    it('should have SearchFlightUseCase', () => {
        const useCase = moduleRef.get(SearchFlightUseCase);
        expect(useCase).toBeDefined();
    });

    it('should have FlightApiService as IFlightDataService', () => {
        const service = moduleRef.get('IFlightDataService');
        expect(service).toBeInstanceOf(FlightServiceImpl);
    });
});
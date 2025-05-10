import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';

describe('@flight/interfaces/http/flight/controllers/flight', () => {
    let controller: FlightController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FlightController],
        }).compile();

        controller = module.get<FlightController>(FlightController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

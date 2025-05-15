import { Module } from '@nestjs/common';
import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';
import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { FlightServiceImpl } from '@flight/infra/services/flight';

@Module({
    imports: [],
    controllers: [FlightController],
    providers: [
        SearchFlightUseCase,
        {
            provide: 'FlightService',
            useClass: FlightServiceImpl
        },
    ]
})
export class FlightModule { }
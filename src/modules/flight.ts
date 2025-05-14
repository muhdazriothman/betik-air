import { Module } from '@nestjs/common';
import { FlightController } from '@flight/interfaces/http/flight/controllers/flight';
import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { FlightApiService } from '@flight/infra/services/flight-api';

@Module({
    imports: [],
    controllers: [FlightController],
    providers: [
        SearchFlightUseCase,
        {
            provide: 'IFlightDataService',
            useClass: FlightApiService
        },
    ]
})
export class FlightModule { }
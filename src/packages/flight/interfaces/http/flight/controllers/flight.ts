import { Controller, Get, Query } from '@nestjs/common';

import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { GetFlightDestinationUseCase } from '@flight/application/use-cases/get-flight-destination';

import { SearchFlightDto } from '@flight/interfaces/http/flight/dtos/search-flight';

@Controller('flight')
export class FlightController {
    constructor(
        private readonly searchFlightUseCase: SearchFlightUseCase,
        private readonly getFlightDestinationUseCase: GetFlightDestinationUseCase
    ) { }

    @Get('search')
    async searchFlight(@Query() query: SearchFlightDto) {
        return this.searchFlightUseCase.execute(query);
    }

    @Get('destination')
    async getFlightDestination() {
        return this.getFlightDestinationUseCase.execute();
    }
}
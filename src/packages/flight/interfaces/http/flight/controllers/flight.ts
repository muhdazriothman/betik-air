import { Controller, Get, Query } from '@nestjs/common';

import { SearchFlightUseCase } from '@flight/application/use-cases/search';

import { SearchFlightDto } from '@flight/interfaces/http/flight/dtos/search-flight';

@Controller('flight')
export class FlightController {
    constructor(private readonly searchFlightUseCase: SearchFlightUseCase) { }

    @Get('search')
    async searchFlight(@Query() query: SearchFlightDto) {
        return this.searchFlightUseCase.execute(query);
    }
}
import { Controller, Get, Query } from '@nestjs/common';

import { SearchFlightUseCase } from '@flight/application/use-cases/search-flight';
import { FlightMapper } from '@flight/interfaces/http/flight/mappers/flight-response';

import { SearchFlightDto } from '@flight/interfaces/http/flight/dtos/search-flight';

@Controller('flight')
export class FlightController {
    constructor(
        private readonly searchFlightUseCase: SearchFlightUseCase,
    ) { }

    @Get('search')
    async searchFlight(@Query() query: SearchFlightDto) {
        const flights = await this.searchFlightUseCase.execute(query);
        return FlightMapper.toListDto(flights);
    }
}
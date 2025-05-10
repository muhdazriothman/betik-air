import { Injectable, Inject } from '@nestjs/common';

import { IFlightDataService } from '@flight/application/interfaces/flight-data-service';

@Injectable()
export class GetFlightDestinationUseCase {
    constructor(
        @Inject('IFlightDataService')
        private readonly flightDataService: IFlightDataService
    ) { }

    async execute() {
        const flightDestinations = await this.flightDataService.getFlightDestinations();
        return flightDestinations;
    }
}
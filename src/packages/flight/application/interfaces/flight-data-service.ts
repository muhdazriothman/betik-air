import { Flight } from "@flight/domain/entities/flight";
import { FlightDestination } from "@flight/domain/entities/flight-destination";

export interface FlightSearchParams {
    departureDate: string;
    returnDate: string;
    origin: string;
    originId: string;
    destination: string;
    destinationId: string;
}

export interface IFlightDataService {
    searchFlight(params: FlightSearchParams): Promise<Flight>;
    getFlightDestinations(): Promise<FlightDestination[]>;
}
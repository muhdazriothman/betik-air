import { Flight } from "@flight/domain/entities/flight";

export interface FlightSearchParams {
    departureDate: string;
    returnDate: string;
    origin: string;
    originId: string;
    destination: string;
    destinationId: string;
}

export interface FlightDataService {
    searchFlight(params: FlightSearchParams): Promise<Flight[]>;
}
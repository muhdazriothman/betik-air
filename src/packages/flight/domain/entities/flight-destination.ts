export interface FlightDestinationProps {
    locationId: string;
    locationName: string;
    locationCode: string;
}

export class FlightDestination {
    public locationId: string;
    public locationName: string;
    public locationCode: string;

    constructor(flightDestination: FlightDestinationProps) {
        this.locationId = flightDestination.locationId;
        this.locationName = flightDestination.locationName;
        this.locationCode = flightDestination.locationCode;
    }

    static create(flightDestination: FlightDestinationProps): FlightDestination {
        return new FlightDestination(flightDestination);
    }
}

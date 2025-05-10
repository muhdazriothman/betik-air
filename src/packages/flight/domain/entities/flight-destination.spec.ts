import { FlightDestination, FlightDestinationProps } from '@flight/domain/entities/flight-destination';

describe('@flight/domain/entities/flight-destination', () => {
    let flightDestination: FlightDestination;
    let flightDestinationProps: FlightDestinationProps;

    beforeEach(() => {
        flightDestinationProps = {
            locationId: '27537542',
            locationName: 'New York',
            locationCode: 'NYCA'
        };

        flightDestination = new FlightDestination(flightDestinationProps);
    });

    describe('#constructor', () => {
        it('should create a FlightDestination instance with provided props', () => {
            expect(flightDestination.locationId).toBe(flightDestinationProps.locationId);
            expect(flightDestination.locationName).toBe(flightDestinationProps.locationName);
            expect(flightDestination.locationCode).toBe(flightDestinationProps.locationCode);
        });
    });

    describe('#create', () => {
        it('should create a FlightDestination instance with provided props', () => {
            flightDestination = FlightDestination.create(flightDestinationProps);

            expect(flightDestination.locationId).toBe(flightDestinationProps.locationId);
            expect(flightDestination.locationName).toBe(flightDestinationProps.locationName);
            expect(flightDestination.locationCode).toBe(flightDestinationProps.locationCode);
        });
    });
});
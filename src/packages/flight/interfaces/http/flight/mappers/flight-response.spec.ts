import { Flight, FlightLeg, FlightSegment } from "@flight/domain/entities/flight";

export interface FlightResponseDto {
    id: string;
    legs: FlightLegResponseDto[];
    price: number;
    priceFormatted: string;
    priceAfterDiscount: number;
    priceAfterDiscountFormatted: string;
}

export interface FlightLegResponseDto {
    arrival: string;
    departure: string;
    originCode: string;
    originName: string;
    destinationCode: string;
    destinationName: string;
    durationInMinutes: number;
    stopCount: number;
    segments: FlightSegmentResponseDto[];
}

export interface FlightSegmentResponseDto {
    arrival: string;
    departure: string;
    originCode: string;
    originName: string;
    destinationCode: string;
    destinationName: string;
    carrier: string;
    flightNumber: string;
}

export class FlightResponseMapper {
    static toResponse(flight: Flight): FlightResponseDto {
        const flightResponse = {
            id: flight.id,
            price: flight.price,
            priceFormatted: flight.priceFormatted,
            priceAfterDiscount: flight.priceAfterDiscount,
            priceAfterDiscountFormatted: flight.priceAfterDiscountFormatted,
            legs: [] as FlightLegResponseDto[]
        };

        for (const leg of flight.legs) {
            flightResponse.legs.push(FlightResponseMapper.toFlightLegResponseDto(leg));
        }

        return flightResponse;
    }

    static toResponseArray(flights: Flight[]): FlightResponseDto[] {
        return flights.map(flight => this.toResponse(flight));
    }

    static toFlightLegResponseDto(leg: FlightLeg): FlightLegResponseDto {
        const legResponse = {
            arrival: leg.arrival,
            departure: leg.departure,
            originCode: leg.originCode,
            originName: leg.originName,
            destinationCode: leg.destinationCode,
            destinationName: leg.destinationName,
            durationInMinutes: leg.durationInMinutes,
            stopCount: leg.stopCount,
            segments: [] as FlightSegmentResponseDto[]
        };

        for (const segment of leg.segments) {
            const segmentResponse = FlightResponseMapper.toFlightSegmentResponseDto(segment);
            legResponse.segments.push(segmentResponse);
        }

        return legResponse;
    }

    static toFlightSegmentResponseDto(segment: FlightSegment): FlightSegmentResponseDto {
        return {
            arrival: segment.arrival,
            departure: segment.departure,
            originCode: segment.originCode,
            originName: segment.originName,
            destinationCode: segment.destinationCode,
            destinationName: segment.destinationName,
            carrier: segment.carrier,
            flightNumber: segment.flightNumber
        };
    }
}
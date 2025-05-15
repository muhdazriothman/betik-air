import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { Flight, FlightLeg, FlightSegment } from '@flight/domain/entities/flight';
import { FlightService, FlightSearchParams } from '@flight/domain/services/flight';
import { SearchFlightResponse } from '../api/search-flight-response';

@Injectable()
export class FlightServiceImpl implements FlightService {
    async searchFlight(params: FlightSearchParams): Promise<Flight[]> {
        const options = {
            method: 'GET',
            url: 'https://skyscanner89.p.rapidapi.com/flights/roundtrip/list',
            params: {
                inDate: params.departureDate,
                outDate: params.returnDate,
                origin: params.origin,
                originId: params.originId,
                destination: params.destination,
                destinationId: params.destinationId
            },
            headers: {
                'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
                'X-RapidAPI-Key': '72d27fea0bmsh5bf5bd0e6055a2ap1fa775jsn272a4e9426cf'
            }
        };

        try {
            const response = await axios.request<SearchFlightResponse>(options);

            const flightIdSet: Set<string> = new Set();
            const flightDate: Flight[] = [];

            if (response.data?.data?.itineraries?.buckets?.[0]?.items) {

                for (const item of response.data.data.itineraries.buckets[0]?.items) {
                    if (flightIdSet.has(item.id)) {
                        continue;
                    }

                    flightIdSet.add(item.id);

                    const flight: Flight = new Flight({
                        id: item.id,
                        legs: [],
                        price: item.price.raw,
                        priceFormatted: item.price.formatted,
                        priceAfterDiscount: item.price.raw,
                        priceAfterDiscountFormatted: item.price.formatted,
                    });

                    for (const leg of item.legs) {
                        const flightLeg: FlightLeg = {
                            arrival: leg.arrival,
                            departure: leg.departure,
                            originCode: leg.origin.id,
                            originName: leg.origin.name,
                            destinationCode: leg.destination.id,
                            destinationName: leg.destination.name,
                            durationInMinutes: leg.durationInMinutes,
                            stopCount: leg.stopCount,
                            segments: [],
                        };

                        for (const segment of leg.segments) {
                            const flightSegment: FlightSegment = {
                                arrival: segment.arrival,
                                departure: segment.departure,
                                originCode: segment.origin.displayCode,
                                originName: segment.origin.name,
                                destinationCode: segment.destination.displayCode,
                                destinationName: segment.destination.name,
                                carrier: segment.operatingCarrier.name,
                                flightNumber: segment.flightNumber,
                            };

                            flightLeg.segments.push(flightSegment);
                        }

                        flight.legs.push(flightLeg);
                    }

                    flightDate.push(flight);
                }

                return flightDate;
            }

            return [];
        } catch (error) {
            console.error('error', error);
            throw new Error(`Failed to search flights: ${error.message}`);
        }
    }
}
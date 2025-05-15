import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { Flight, FlightLeg, FlightSegment } from '@flight/domain/entities/flight';
import { FlightService, FlightSearchParams } from '@flight/domain/services/flight-data-service';
import { SearchFlightApiResponse } from '@flight/infra/api/search-flight-api-response';

@Injectable()
export class FlightServiceImpl implements FlightService {
    async searchFlight(params: FlightSearchParams): Promise<Flight[]> {
        // TODO: Uncomment this when access to RapidAPI is granted
        // const options = {
        //     method: 'GET',
        //     url: 'https://skyscanner89.p.rapidapi.com/flights/roundtrip/list',
        //     params: {
        //         inDate: params.departureDate,
        //         outDate: params.returnDate,
        //         origin: params.origin,
        //         originId: params.originId,
        //         destination: params.destination,
        //         destinationId: params.destinationId
        //     },
        //     headers: {
        //         'x-rapidapi-host': 'skyscanner89.p.rapidapi.com'
        //     }
        // };

        try {
            // TODO: Uncomment this when access to RapidAPI is granted
            // const response = await axios.request(options);

            const response = FlightServiceImpl.getMockFlight();

            const flightIdSet: Set<string> = new Set();
            const flightDate: Flight[] = [];

            for (const item of response.data.itineraries.buckets[0].items) {
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
        } catch (error) {
            throw new Error(`Failed to search flights: ${error.message}`);
        }
    }

    static getMockFlight(): SearchFlightApiResponse {
        return {
            "data": {
                "accommodations": {
                    "buckets": [],
                    "context": {
                        "sessionId": "84b94b7845c94ff287158af2fb9cb9cf",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "brandCarousel": {
                    "buckets": null,
                    "context": {
                        "sessionId": "460488d4-532c-44a9-bcd9-7c9b4243609e",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "brandInlines": {
                    "buckets": null,
                    "context": {
                        "sessionId": "460488d4-532c-44a9-bcd9-7c9b4243609e",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "carHire": {
                    "buckets": [
                        {
                            "id": "Medium",
                            "items": [
                                {
                                    "bags": 4,
                                    "carClass": "INTERMEDIATE",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "Medium"
                                        },
                                        "displayName": {
                                            "displayName": "Medium",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 9.215136,
                                        "logicalName": "Medium"
                                    },
                                    "formattedCarClass": "Intermediate/Standard",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$34",
                                    "formattedTotalPrice": "$101",
                                    "groupKey": "intermediate",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/intermediate.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 3335,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=intermediate&source=combined_result",
                                    "seats": 5
                                }
                            ],
                            "name": "Medium"
                        },
                        {
                            "id": "Large",
                            "items": [
                                {
                                    "bags": 4,
                                    "carClass": "FULLSIZE",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "Large"
                                        },
                                        "displayName": {
                                            "displayName": "Large",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 9.155915,
                                        "logicalName": "Large"
                                    },
                                    "formattedCarClass": "Fullsize",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$36",
                                    "formattedTotalPrice": "$108",
                                    "groupKey": "fullsize",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/fullsize.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 3586,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=fullsize&source=combined_result",
                                    "seats": 5
                                }
                            ],
                            "name": "Large"
                        },
                        {
                            "id": "SUV",
                            "items": [
                                {
                                    "bags": 3,
                                    "carClass": "SUV",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "SUV"
                                        },
                                        "displayName": {
                                            "displayName": "SUV",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 9.132591,
                                        "logicalName": "SUV"
                                    },
                                    "formattedCarClass": "SUV",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$37",
                                    "formattedTotalPrice": "$111",
                                    "groupKey": "suv",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/suv.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 3685,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=suv&source=combined_result",
                                    "seats": 5
                                }
                            ],
                            "name": "SUV"
                        },
                        {
                            "id": "Small",
                            "items": [
                                {
                                    "bags": 1,
                                    "carClass": "MINI",
                                    "doors": "2-3_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "Small"
                                        },
                                        "displayName": {
                                            "displayName": "Small",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 9.113143,
                                        "logicalName": "Small"
                                    },
                                    "formattedCarClass": "Mini",
                                    "formattedDoors": "2-3 doors",
                                    "formattedPrice": "$38",
                                    "formattedTotalPrice": "$114",
                                    "groupKey": "mini",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/mini.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 3768,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=mini&source=combined_result",
                                    "seats": 4
                                }
                            ],
                            "name": "Small"
                        },
                        {
                            "id": "Luxury",
                            "items": [
                                {
                                    "bags": 2,
                                    "carClass": "PREMIUM",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "Luxury"
                                        },
                                        "displayName": {
                                            "displayName": "Luxury",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 8.886961,
                                        "logicalName": "Luxury"
                                    },
                                    "formattedCarClass": "Premium/Luxury",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$48",
                                    "formattedTotalPrice": "$142",
                                    "groupKey": "premium",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/premium.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 4729,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=premium&source=combined_result",
                                    "seats": 5
                                }
                            ],
                            "name": "Luxury"
                        },
                        {
                            "id": "People carrier",
                            "items": [
                                {
                                    "bags": 3,
                                    "carClass": "PEOPLE_CARRIER",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "People_carrier"
                                        },
                                        "displayName": {
                                            "displayName": "People carrier",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 8.649105,
                                        "logicalName": "People carrier"
                                    },
                                    "formattedCarClass": "People carrier",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$58",
                                    "formattedTotalPrice": "$173",
                                    "groupKey": "people_carrier",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/people_carrier.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 5739,
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202505121000&dropofftime=202505151000&driversage=30&variant=samedropoff&carclass=passenger_van&source=combined_result",
                                    "seats": 7
                                }
                            ],
                            "name": "People carrier"
                        }
                    ],
                    "context": {
                        "sessionId": "5eb8cbe1-d8c2-4eb9-9c04-98d29dab5818",
                        "status": "complete",
                        "totalResults": 6
                    },
                    "results": []
                },
                "context": {
                    "sessionId": "KLUv_SD59QUAko4sH7DrLJ0yDHMD0KSb3DILtutCJFW2JKX3mL0ivuIgwQEPFCTf3CmjlP3VeVL73M00T0ibH8JvKuN0XdhSAIRHZypVvaz8uaF9_nqbpfWK463W62WUt7xZCEPzAsKyX-1XS1qUM7FxaVn9lmlvan9tR57yuAiG-ABDct2mZYR3A51GKmVVMbTXOUarGV6q4b-RxjpbOQLiPqSzZde3DX9lKz_VzVZOhrtyb0hbec6LCmCQXgIA8IYCFzhTUg==",
                    "status": "incomplete"
                },
                "itineraries": {
                    "agents": null,
                    "alliances": null,
                    "buckets": [
                        {
                            "id": "Best",
                            "items": [
                                {
                                    "eco": {
                                        "ecoContenderDelta": 15.032559
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120900--32385-0-12240-2505121356|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:56:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 656,
                                            "id": "12712-2505120900--32385-0-12240-2505121356",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:56:00",
                                                    "departure": "2025-05-12T09:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 656,
                                                    "flightNumber": "636",
                                                    "id": "12712-12240-2505120900-2505121356--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "HkSSpwOJAqFT",
                                        "raw": 777.4
                                    },
                                    "score": 0.999
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32249-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2505120905-2505121355--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32249-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "50",
                                                    "id": "12240-12712-2505151515-2505160655--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "avB2mQSR1q4N",
                                        "raw": 777.4
                                    },
                                    "score": 0.947255,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32593-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "8050",
                                                    "id": "12240-12712-2505151515-2505160655--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$750",
                                        "pricingOptionId": "r6v1BzPrv0Fw",
                                        "raw": 749.36
                                    },
                                    "score": 0.82835114,
                                    "tags": [
                                        "second_cheapest",
                                        "shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 12.839418
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151200--32593-1-11442-2505160559",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T05:59:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "partially_operated"
                                            },
                                            "departure": "2025-05-15T12:00:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 719,
                                            "id": "12240-2505151200--32593-1-11442-2505160559",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-15T20:25:00",
                                                    "departure": "2025-05-15T12:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 325,
                                                    "flightNumber": "8002",
                                                    "id": "12240-13416-2505151200-2505152025--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-16T05:59:00",
                                                    "departure": "2025-05-15T21:43:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 316,
                                                    "flightNumber": "282",
                                                    "id": "13416-11442-2505152143-2505160559--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$770",
                                        "pricingOptionId": "gqGo8eJZmvpr",
                                        "raw": 769.3
                                    },
                                    "score": 0.758452,
                                    "tags": [
                                        "third_cheapest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 18.814575
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120835--32385-1-12240-2505121552|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T15:52:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T08:35:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 797,
                                            "id": "12712-2505120835--32385-1-12240-2505121552",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T11:50:00",
                                                    "departure": "2025-05-12T08:35:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 375,
                                                    "flightNumber": "713",
                                                    "id": "12712-13416-2505120835-2505121150--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T15:52:00",
                                                    "departure": "2025-05-12T13:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 342,
                                                    "flightNumber": "465",
                                                    "id": "13416-12240-2505121310-2505121552--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$788",
                                        "pricingOptionId": "qExTjIfWUF1y",
                                        "raw": 787.1
                                    },
                                    "score": 0.758049
                                }
                            ],
                            "name": "Best"
                        },
                        {
                            "id": "Cheapest",
                            "items": [
                                {
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "11442-2505121038--32573-1-12240-2505121708|12240-2505152130--32573-1-12712-2505161528",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T17:08:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AA",
                                                        "id": -32573,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
                                                        "name": "American Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T10:38:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 750,
                                            "id": "11442-2505121038--32573-1-12240-2505121708",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:10:00",
                                                    "departure": "2025-05-12T10:38:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "PHX",
                                                        "flightPlaceId": "PHX",
                                                        "name": "Phoenix Sky Harbor",
                                                        "parent": {
                                                            "displayCode": "PHX",
                                                            "flightPlaceId": "PHXA",
                                                            "name": "Phoenix",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 332,
                                                    "flightNumber": "3058",
                                                    "id": "11442-15343-2505121038-2505121310--32573",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T17:08:00",
                                                    "departure": "2025-05-12T13:35:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 393,
                                                    "flightNumber": "675",
                                                    "id": "15343-12240-2505121335-2505121708--32573",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "PHX",
                                                        "flightPlaceId": "PHX",
                                                        "name": "Phoenix Sky Harbor",
                                                        "parent": {
                                                            "displayCode": "PHX",
                                                            "flightPlaceId": "PHXA",
                                                            "name": "Phoenix",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T15:28:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AA",
                                                        "id": -32573,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
                                                        "name": "American Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T21:30:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 718,
                                            "id": "12240-2505152130--32573-1-12712-2505161528",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:04:00",
                                                    "departure": "2025-05-15T21:30:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 334,
                                                    "flightNumber": "144",
                                                    "id": "12240-13416-2505152130-2505160604--32573",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-16T15:28:00",
                                                    "departure": "2025-05-16T07:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "2",
                                                    "id": "13416-12712-2505160700-2505161528--32573",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AA",
                                                        "displayCode": "",
                                                        "id": -32573,
                                                        "name": "American Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$712",
                                        "pricingOptionId": "uCsXG0jGnTe1",
                                        "raw": 711.8
                                    },
                                    "score": 0.999,
                                    "tags": [
                                        "cheapest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32593-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "8050",
                                                    "id": "12240-12712-2505151515-2505160655--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$750",
                                        "pricingOptionId": "r6v1BzPrv0Fw",
                                        "raw": 749.36
                                    },
                                    "score": 0.82835114,
                                    "tags": [
                                        "second_cheapest",
                                        "shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 12.839418
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151200--32593-1-11442-2505160559",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T05:59:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "partially_operated"
                                            },
                                            "departure": "2025-05-15T12:00:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 719,
                                            "id": "12240-2505151200--32593-1-11442-2505160559",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-15T20:25:00",
                                                    "departure": "2025-05-15T12:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 325,
                                                    "flightNumber": "8002",
                                                    "id": "12240-13416-2505151200-2505152025--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-16T05:59:00",
                                                    "departure": "2025-05-15T21:43:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 316,
                                                    "flightNumber": "282",
                                                    "id": "13416-11442-2505152143-2505160559--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$770",
                                        "pricingOptionId": "gqGo8eJZmvpr",
                                        "raw": 769.3
                                    },
                                    "score": 0.7366415,
                                    "tags": [
                                        "third_cheapest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32249-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2505120905-2505121355--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32249-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "50",
                                                    "id": "12240-12712-2505151515-2505160655--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "avB2mQSR1q4N",
                                        "raw": 777.4
                                    },
                                    "score": 0.7002086,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 15.032559
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120900--32385-0-12240-2505121356|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:56:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 656,
                                            "id": "12712-2505120900--32385-0-12240-2505121356",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:56:00",
                                                    "departure": "2025-05-12T09:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 656,
                                                    "flightNumber": "636",
                                                    "id": "12712-12240-2505120900-2505121356--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "HkSSpwOJAqFT",
                                        "raw": 777.4
                                    },
                                    "score": 0.7000952
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 20.07342
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505121355--32385-1-12240-2505122034|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T20:34:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T13:55:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 759,
                                            "id": "12712-2505121355--32385-1-12240-2505122034",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T17:07:00",
                                                    "departure": "2025-05-12T13:55:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 372,
                                                    "flightNumber": "747",
                                                    "id": "12712-13416-2505121355-2505121707--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T20:34:00",
                                                    "departure": "2025-05-12T17:55:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 339,
                                                    "flightNumber": "443",
                                                    "id": "13416-12240-2505121755-2505122034--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$788",
                                        "pricingOptionId": "vhkzWBd5Jh_q",
                                        "raw": 787.1
                                    },
                                    "score": 0.65533346
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 18.814575
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120835--32385-1-12240-2505121552|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T15:52:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T08:35:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 797,
                                            "id": "12712-2505120835--32385-1-12240-2505121552",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T11:50:00",
                                                    "departure": "2025-05-12T08:35:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 375,
                                                    "flightNumber": "713",
                                                    "id": "12712-13416-2505120835-2505121150--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T15:52:00",
                                                    "departure": "2025-05-12T13:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 342,
                                                    "flightNumber": "465",
                                                    "id": "13416-12240-2505121310-2505121552--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$788",
                                        "pricingOptionId": "qExTjIfWUF1y",
                                        "raw": 787.1
                                    },
                                    "score": 0.6551738
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 16.241472
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "11442-2505120710--32385-1-12240-2505121316|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:16:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T07:10:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 726,
                                            "id": "11442-2505120710--32385-1-12240-2505121316",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T10:10:00",
                                                    "departure": "2025-05-12T07:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "SLC",
                                                        "flightPlaceId": "SLC",
                                                        "name": "Salt Lake City",
                                                        "parent": {
                                                            "displayCode": "SLC",
                                                            "flightPlaceId": "SLCA",
                                                            "name": "Salt Lake City",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 300,
                                                    "flightNumber": "1009",
                                                    "id": "11442-16359-2505120710-2505121010--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T13:16:00",
                                                    "departure": "2025-05-12T10:45:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 391,
                                                    "flightNumber": "316",
                                                    "id": "16359-12240-2505121045-2505121316--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "SLC",
                                                        "flightPlaceId": "SLC",
                                                        "name": "Salt Lake City",
                                                        "parent": {
                                                            "displayCode": "SLC",
                                                            "flightPlaceId": "SLCA",
                                                            "name": "Salt Lake City",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$865",
                                        "pricingOptionId": "DkbjrhfxsfCS",
                                        "raw": 864.6
                                    },
                                    "score": 0.30129784
                                }
                            ],
                            "name": "Cheapest"
                        },
                        {
                            "id": "Fastest",
                            "items": [
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32593-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "8050",
                                                    "id": "12240-12712-2505151515-2505160655--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$750",
                                        "pricingOptionId": "r6v1BzPrv0Fw",
                                        "raw": 749.36
                                    },
                                    "score": 0.9998282,
                                    "tags": [
                                        "second_cheapest",
                                        "shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32249-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2505120905-2505121355--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32249-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "50",
                                                    "id": "12240-12712-2505151515-2505160655--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "avB2mQSR1q4N",
                                        "raw": 777.4
                                    },
                                    "score": 0.99969995,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32171-0-12240-2505121355|12240-2505151515--32171-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "B6",
                                                        "id": -32171,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
                                                        "name": "jetBlue"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32171-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "5851",
                                                    "id": "12712-12240-2505120905-2505121355--32171",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "B6",
                                                        "displayCode": "",
                                                        "id": -32171,
                                                        "name": "jetBlue"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "B6",
                                                        "id": -32171,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
                                                        "name": "jetBlue"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32171-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "5850",
                                                    "id": "12240-12712-2505151515-2505160655--32171",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "B6",
                                                        "displayCode": "",
                                                        "id": -32171,
                                                        "name": "jetBlue"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$931",
                                        "pricingOptionId": "iSPr2dlRn3r9",
                                        "raw": 930.4
                                    },
                                    "score": 0.999,
                                    "tags": [
                                        "third_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 15.032559
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120900--32385-0-12240-2505121356|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:56:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 656,
                                            "id": "12712-2505120900--32385-0-12240-2505121356",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:56:00",
                                                    "departure": "2025-05-12T09:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 656,
                                                    "flightNumber": "636",
                                                    "id": "12712-12240-2505120900-2505121356--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "HkSSpwOJAqFT",
                                        "raw": 777.4
                                    },
                                    "score": 0.886368
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 16.241472
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "11442-2505120710--32385-1-12240-2505121316|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:16:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T07:10:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 726,
                                            "id": "11442-2505120710--32385-1-12240-2505121316",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T10:10:00",
                                                    "departure": "2025-05-12T07:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "SLC",
                                                        "flightPlaceId": "SLC",
                                                        "name": "Salt Lake City",
                                                        "parent": {
                                                            "displayCode": "SLC",
                                                            "flightPlaceId": "SLCA",
                                                            "name": "Salt Lake City",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 300,
                                                    "flightNumber": "1009",
                                                    "id": "11442-16359-2505120710-2505121010--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T13:16:00",
                                                    "departure": "2025-05-12T10:45:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 391,
                                                    "flightNumber": "316",
                                                    "id": "16359-12240-2505121045-2505121316--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "SLC",
                                                        "flightPlaceId": "SLC",
                                                        "name": "Salt Lake City",
                                                        "parent": {
                                                            "displayCode": "SLC",
                                                            "flightPlaceId": "SLCA",
                                                            "name": "Salt Lake City",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$865",
                                        "pricingOptionId": "DkbjrhfxsfCS",
                                        "raw": 864.6
                                    },
                                    "score": 0.5921456
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 6.648177
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120730--32385-1-12240-2505121343|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:43:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T07:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 733,
                                            "id": "12712-2505120730--32385-1-12240-2505121343",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T09:39:00",
                                                    "departure": "2025-05-12T07:30:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "MSP",
                                                        "flightPlaceId": "MSP",
                                                        "name": "Minneapolis St Paul",
                                                        "parent": {
                                                            "displayCode": "MSP",
                                                            "flightPlaceId": "MSPA",
                                                            "name": "Minneapolis",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 189,
                                                    "flightNumber": "2390",
                                                    "id": "12712-14346-2505120730-2505120939--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T13:43:00",
                                                    "departure": "2025-05-12T10:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 513,
                                                    "flightNumber": "312",
                                                    "id": "14346-12240-2505121010-2505121343--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "MSP",
                                                        "flightPlaceId": "MSP",
                                                        "name": "Minneapolis St Paul",
                                                        "parent": {
                                                            "displayCode": "MSP",
                                                            "flightPlaceId": "MSPA",
                                                            "name": "Minneapolis",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$908",
                                        "pricingOptionId": "Pafn5dsay5k9",
                                        "raw": 907.1
                                    },
                                    "score": 0.5625687
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 20.07342
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505121355--32385-1-12240-2505122034|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T20:34:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T13:55:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 759,
                                            "id": "12712-2505121355--32385-1-12240-2505122034",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T17:07:00",
                                                    "departure": "2025-05-12T13:55:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 372,
                                                    "flightNumber": "747",
                                                    "id": "12712-13416-2505121355-2505121707--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T20:34:00",
                                                    "departure": "2025-05-12T17:55:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 339,
                                                    "flightNumber": "443",
                                                    "id": "13416-12240-2505121755-2505122034--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$788",
                                        "pricingOptionId": "vhkzWBd5Jh_q",
                                        "raw": 787.1
                                    },
                                    "score": 0.45398325
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 12.839418
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151200--32593-1-11442-2505160559",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": true,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T05:59:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "partially_operated"
                                            },
                                            "departure": "2025-05-15T12:00:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 719,
                                            "id": "12240-2505151200--32593-1-11442-2505160559",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-15T20:25:00",
                                                    "departure": "2025-05-15T12:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 325,
                                                    "flightNumber": "8002",
                                                    "id": "12240-13416-2505151200-2505152025--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-16T05:59:00",
                                                    "departure": "2025-05-15T21:43:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "EWR",
                                                        "flightPlaceId": "EWR",
                                                        "name": "New York Newark",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 316,
                                                    "flightNumber": "282",
                                                    "id": "13416-11442-2505152143-2505160559--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAX",
                                                        "flightPlaceId": "LAX",
                                                        "name": "Los Angeles International",
                                                        "parent": {
                                                            "displayCode": "LAX",
                                                            "flightPlaceId": "LAXA",
                                                            "name": "Los Angeles",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$770",
                                        "pricingOptionId": "gqGo8eJZmvpr",
                                        "raw": 769.3
                                    },
                                    "score": 0.4162874,
                                    "tags": [
                                        "third_cheapest"
                                    ]
                                }
                            ],
                            "name": "Fastest"
                        },
                        {
                            "id": "Direct",
                            "items": [
                                {
                                    "eco": {
                                        "ecoContenderDelta": 15.032559
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120900--32385-0-12240-2505121356|12240-2505151509--32385-0-12712-2505160710",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:56:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 656,
                                            "id": "12712-2505120900--32385-0-12240-2505121356",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:56:00",
                                                    "departure": "2025-05-12T09:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 656,
                                                    "flightNumber": "636",
                                                    "id": "12712-12240-2505120900-2505121356--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T07:10:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "DL",
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:09:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 601,
                                            "id": "12240-2505151509--32385-0-12712-2505160710",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T07:10:00",
                                                    "departure": "2025-05-15T15:09:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 601,
                                                    "flightNumber": "650",
                                                    "id": "12240-12712-2505151509-2505160710--32385",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "DL",
                                                        "displayCode": "",
                                                        "id": -32385,
                                                        "name": "Delta"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "HkSSpwOJAqFT",
                                        "raw": 777.4
                                    },
                                    "score": 0.999
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32249-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2505120905-2505121355--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32249-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "50",
                                                    "id": "12240-12712-2505151515-2505160655--32249",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$778",
                                        "pricingOptionId": "avB2mQSR1q4N",
                                        "raw": 777.4
                                    },
                                    "score": 0.947255,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32593-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "8051",
                                                    "id": "12712-12240-2505120905-2505121355--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "AS",
                                                        "id": -32593,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                                        "name": "Alaska Airlines"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32593-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "8050",
                                                    "id": "12240-12712-2505151515-2505160655--32593",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "AS",
                                                        "displayCode": "",
                                                        "id": -32593,
                                                        "name": "Alaska Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$750",
                                        "pricingOptionId": "r6v1BzPrv0Fw",
                                        "raw": 749.36
                                    },
                                    "score": 0.891122,
                                    "tags": [
                                        "second_cheapest",
                                        "shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 25.787676
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32171-0-12240-2505121355|12240-2505151515--32171-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T13:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "B6",
                                                        "id": -32171,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
                                                        "name": "jetBlue"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-12T09:05:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 650,
                                            "id": "12712-2505120905--32171-0-12240-2505121355",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:55:00",
                                                    "departure": "2025-05-12T09:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 650,
                                                    "flightNumber": "5851",
                                                    "id": "12712-12240-2505120905-2505121355--32171",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "B6",
                                                        "displayCode": "",
                                                        "id": -32171,
                                                        "name": "jetBlue"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T06:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "B6",
                                                        "id": -32171,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
                                                        "name": "jetBlue"
                                                    }
                                                ],
                                                "operating": [
                                                    {
                                                        "alternateId": "HA",
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "not_operated"
                                            },
                                            "departure": "2025-05-15T15:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 580,
                                            "id": "12240-2505151515--32171-0-12712-2505160655",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-16T06:55:00",
                                                    "departure": "2025-05-15T15:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "JFK",
                                                        "flightPlaceId": "JFK",
                                                        "name": "New York John F. Kennedy",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 580,
                                                    "flightNumber": "5850",
                                                    "id": "12240-12712-2505151515-2505160655--32171",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "B6",
                                                        "displayCode": "",
                                                        "id": -32171,
                                                        "name": "jetBlue"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "HA",
                                                        "displayCode": "",
                                                        "id": -32249,
                                                        "name": "Hawaiian Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "HNL",
                                                        "flightPlaceId": "HNL",
                                                        "name": "Honolulu International",
                                                        "parent": {
                                                            "displayCode": "HNL",
                                                            "flightPlaceId": "HNLA",
                                                            "name": "Honolulu",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$931",
                                        "pricingOptionId": "iSPr2dlRn3r9",
                                        "raw": 930.4
                                    },
                                    "score": 0.767955,
                                    "tags": [
                                        "third_shortest"
                                    ]
                                }
                            ],
                            "name": "Direct"
                        }
                    ],
                    "context": {
                        "sessionId": "460488d4-532c-44a9-bcd9-7c9b4243609e",
                        "status": "incomplete",
                        "totalResults": 10
                    },
                    "creatives": null,
                    "destinationImageUrl": "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
                    "filterStats": {
                        "airports": [
                            {
                                "airports": [
                                    {
                                        "entityId": "95673827",
                                        "id": "HNL",
                                        "name": "Honolulu International"
                                    }
                                ],
                                "city": "Honolulu"
                            },
                            {
                                "airports": [
                                    {
                                        "entityId": "95565058",
                                        "id": "JFK",
                                        "name": "New York John F. Kennedy"
                                    },
                                    {
                                        "entityId": "95565059",
                                        "id": "EWR",
                                        "name": "New York Newark"
                                    }
                                ],
                                "city": "New York"
                            }
                        ],
                        "carriers": [
                            {
                                "alternateId": "AS",
                                "id": -32593,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
                                "minPrice": "$750",
                                "name": "Alaska Airlines"
                            },
                            {
                                "alternateId": "AA",
                                "id": -32573,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
                                "minPrice": "$712",
                                "name": "American Airlines"
                            },
                            {
                                "alternateId": "DL",
                                "id": -32385,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                "minPrice": "$778",
                                "name": "Delta"
                            },
                            {
                                "alternateId": "HA",
                                "id": -32249,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                "minPrice": "$778",
                                "name": "Hawaiian Airlines"
                            },
                            {
                                "alternateId": "B6",
                                "id": -32171,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
                                "minPrice": "$931",
                                "name": "jetBlue"
                            }
                        ],
                        "duration": {
                            "max": 797,
                            "min": 650,
                            "multiCityMax": 1468,
                            "multiCityMin": 1230
                        },
                        "hasCityOpenJaw": true,
                        "multipleCarriers": {
                            "minPrice": "",
                            "rawMinPrice": null
                        },
                        "stopPrices": {
                            "direct": {
                                "formattedPrice": "$750",
                                "isPresent": true,
                                "rawPrice": 750.0
                            },
                            "one": {
                                "formattedPrice": "$712",
                                "isPresent": true,
                                "rawPrice": 712.0
                            },
                            "twoOrMore": {
                                "isPresent": false
                            }
                        },
                        "total": 10
                    },
                    "results": []
                },
                "packages": {
                    "buckets": null,
                    "context": {
                        "sessionId": "460488d4-532c-44a9-bcd9-7c9b4243609e",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                }
            },
            "status": "success",
            "token": "eyJjYyI6ICJlY29ub215IiwgImEiOiAxLCAiYyI6IDAsICJpIjogMCwgImwiOiBbWyJOWUNBIiwgIkhOTCIsICIyMDI1LTA1LTEyIl0sIFsiSE5MIiwgIk5ZQ0EiLCAiMjAyNS0wNS0xNSJdXX0="
        }
    }
}
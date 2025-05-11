import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { Flight, FlightProps } from '@flight/domain/entities/flight';
import { FlightDestination, FlightDestinationProps } from '@flight/domain/entities/flight-destination';
import { IFlightDataService, FlightSearchParams } from '@flight/application/interfaces/flight-data-service';

// Flight Destinations

export interface GetFlightDestinationsResponse {
    data: {
        inputSuggest: InputSuggestItem[];
    }
}

interface InputSuggestItem {
    navigation: Navigation;
    presentation: Presentation;
}

interface Navigation {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: RelevantFlightParams;
    relevantHotelParams: RelevantHotelParams;
}

interface RelevantFlightParams {
    entityId: string;
    flightPlaceType: string;
    localizedName: string;
    skyId: string;
}

interface RelevantHotelParams {
    entityId: string;
    entityType: string;
    localizedName: string;
}

interface Presentation {
    subtitle: string;
    suggestionTitle: string;
    title: string;
}

@Injectable()
export class FlightApiService implements IFlightDataService {
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

            const response = FlightApiService.getMockFlight();

            const itinerariesIdSet: Set<string> = new Set();
            const itineraries: Flight[] = [];

            for (const bucketItems of response.data.itineraries.buckets[0].items) {
                if (itinerariesIdSet.has(bucketItems.id)) {
                    continue;
                }

                itinerariesIdSet.add(bucketItems.id);

                const flightData: Flight = new Flight({
                    id: bucketItems.id,
                    itinerary: {
                        ...bucketItems,
                        price: {
                            formatted: bucketItems.price.formatted,
                            pricingOptionId: bucketItems.price.pricingOptionId,
                            raw: bucketItems.price.raw
                        }
                    },
                });

                itineraries.push(flightData);
            }

            return itineraries;
        } catch (error) {
            throw new Error(`Failed to search flights: ${error.message}`);
        }
    }

    static getMockFlight(): any {
        return {
            data: {
                accommodations: {
                    buckets: [
                        {
                            "id": "common_best_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=187718124&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjIwMy4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTg3NzE4MTI0In0%3D",
                                    "distance": "5.96 miles from Honolulu International",
                                    "id": "187718124",
                                    "imageUrl": "https://content.skyscnr.com/available/1639083748/1639083748_WxH.jpg",
                                    "name": "The Equus",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$203",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 320,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.599999904632568,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9.199999809265137
                                    },
                                    "rawPrice": 203.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46943220&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjI5OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDMyMjAifQ%3D%3D",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1907654139/1907654139_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$298",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 119,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 298.0,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=128477912&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjE1OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTI4NDc3OTEyIn0%3D",
                                    "distance": "1.42 miles from Honolulu International",
                                    "id": "128477912",
                                    "imageUrl": "https://content.skyscnr.com/available/2033396942/2033396942_WxH.jpg",
                                    "name": "Pacific Marina Inn",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$158",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 61,
                                        "description": "Good",
                                        "fivePointsValue": 3.9000000953674316,
                                        "value": 7.800000190734863
                                    },
                                    "rawPrice": 158.0,
                                    "rawPricesFrom": 1,
                                    "stars": 2
                                }
                            ],
                            "name": "Best"
                        },
                        {
                            "id": "cr_4star_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46943220&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjI5OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDMyMjAifQ%3D%3D",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1907654139/1907654139_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$298",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 119,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 298.0,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=218442576&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjQyNC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMjE4NDQyNTc2In0%3D",
                                    "distance": "5.48 miles from Honolulu International",
                                    "id": "218442576",
                                    "imageUrl": "https://content.skyscnr.com/available/1579329496/1579329496_WxH.jpg",
                                    "name": "Renaissance Residences Oahu Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_tc.png",
                                        "name": "Travelocity",
                                        "type": "OTA",
                                        "websiteId": "h_tc"
                                    },
                                    "price": "$424",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 14,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 424.0,
                                    "rawPricesFrom": 1,
                                    "stars": 5
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=216932002&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjI4Ni4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMjE2OTMyMDAyIn0%3D",
                                    "distance": "5.46 miles from Honolulu International",
                                    "id": "216932002",
                                    "imageUrl": "https://content.skyscnr.com/available/1579249029/1579249029_WxH.jpg",
                                    "name": "Renaissance Honolulu Hotel & Spa",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$286",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 75,
                                        "description": "Very Good",
                                        "fivePointsValue": 4.099999904632568,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-64600-4.png",
                                        "value": 8.199999809265137
                                    },
                                    "rawPrice": 286.0,
                                    "rawPricesFrom": 1,
                                    "stars": 5
                                }
                            ],
                            "name": "4 stars+"
                        },
                        {
                            "id": "cr_cheap_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46944979&rooms=1&filters=%7B%22stars%22%3A%223%2C4%2C5%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjE2Ny4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDQ5NzkifQ%3D%3D",
                                    "distance": "4.08 miles from Honolulu International",
                                    "id": "46944979",
                                    "imageUrl": "https://content.skyscnr.com/available/1647188458/1647188458_WxH.jpg",
                                    "name": "Aston at the Executive Centre Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$167",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 6,
                                        "description": "Good",
                                        "fivePointsValue": 3.799999952316284,
                                        "value": 7.599999904632568
                                    },
                                    "rawPrice": 167.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=47007680&rooms=1&filters=%7B%22stars%22%3A%223%2C4%2C5%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjE5Ni4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDcwMDc2ODAifQ%3D%3D",
                                    "distance": "0.90 miles from Honolulu International",
                                    "id": "47007680",
                                    "imageUrl": "https://content.skyscnr.com/available/1840414740/1840414740_WxH.jpg",
                                    "name": "Best Western the Plaza Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$196",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 40,
                                        "description": "Good",
                                        "fivePointsValue": 3.9000000953674316,
                                        "value": 7.800000190734863
                                    },
                                    "rawPrice": 196.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=187718124&rooms=1&filters=%7B%22stars%22%3A%223%2C4%2C5%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjIwMy4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTg3NzE4MTI0In0%3D",
                                    "distance": "5.96 miles from Honolulu International",
                                    "id": "187718124",
                                    "imageUrl": "https://content.skyscnr.com/available/1639083748/1639083748_WxH.jpg",
                                    "name": "The Equus",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$203",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 320,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.599999904632568,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9.199999809265137
                                    },
                                    "rawPrice": 203.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                }
                            ],
                            "name": "Cheapest"
                        },
                        {
                            "id": "cr_excellent_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=216897446&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjM0MC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMjE2ODk3NDQ2In0%3D",
                                    "distance": "4.13 miles from Honolulu International",
                                    "id": "216897446",
                                    "imageUrl": "https://content.skyscnr.com/available/1915808755/1915808755_WxH.jpg",
                                    "name": "AC Hotel Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_fd.png",
                                        "name": "Vio.com",
                                        "type": "OTA",
                                        "websiteId": "h_fd"
                                    },
                                    "price": "$340",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 8,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.900000095367432,
                                        "value": 9.800000190734863
                                    },
                                    "rawPrice": 340.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46943220&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjI5OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDMyMjAifQ%3D%3D",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1907654139/1907654139_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$298",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 119,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 298.0,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=218442576&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjQyNC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMjE4NDQyNTc2In0%3D",
                                    "distance": "5.48 miles from Honolulu International",
                                    "id": "218442576",
                                    "imageUrl": "https://content.skyscnr.com/available/1579329496/1579329496_WxH.jpg",
                                    "name": "Renaissance Residences Oahu Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_tc.png",
                                        "name": "Travelocity",
                                        "type": "OTA",
                                        "websiteId": "h_tc"
                                    },
                                    "price": "$424",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 14,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 424.0,
                                    "rawPricesFrom": 1,
                                    "stars": 5
                                }
                            ],
                            "name": "Excellent reviews"
                        },
                        {
                            "id": "cr_free_breakfast_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=216932002&rooms=1&filters=%7B%22meal_plan%22%3A%22breakfast_included%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjMyMS4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMjE2OTMyMDAyIn0%3D",
                                    "distance": "5.46 miles from Honolulu International",
                                    "id": "216932002",
                                    "imageUrl": "https://content.skyscnr.com/available/1579249029/1579249029_WxH.jpg",
                                    "name": "Renaissance Honolulu Hotel & Spa",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$321",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 75,
                                        "description": "Very Good",
                                        "fivePointsValue": 4.099999904632568,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-64600-4.png",
                                        "value": 8.199999809265137
                                    },
                                    "rawPrice": 321.0,
                                    "rawPricesFrom": 1,
                                    "stars": 5
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46943220&rooms=1&filters=%7B%22meal_plan%22%3A%22breakfast_included%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjM4OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDMyMjAifQ%3D%3D",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1907654139/1907654139_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_r3.png",
                                        "name": "Roompai",
                                        "type": "OTA",
                                        "websiteId": "h_r3"
                                    },
                                    "price": "$388",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 119,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 388.0,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=187546341&rooms=1&filters=%7B%22meal_plan%22%3A%22breakfast_included%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjMyMy4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTg3NTQ2MzQxIn0%3D",
                                    "distance": "5.84 miles from Honolulu International",
                                    "id": "187546341",
                                    "imageUrl": "https://content.skyscnr.com/available/1925781701/1925781701_WxH.jpg",
                                    "name": "Ala Moana Honolulu by Mantra",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ct.png",
                                        "name": "Trip.com",
                                        "type": "OTA",
                                        "websiteId": "h_ct"
                                    },
                                    "price": "$323",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 41,
                                        "description": "Very Good",
                                        "fivePointsValue": 4.0,
                                        "value": 8.0
                                    },
                                    "rawPrice": 323.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                }
                            ],
                            "name": "Breakfast included"
                        },
                        {
                            "id": "cr_free_cancellation_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=187546341&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjI4Mi4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTg3NTQ2MzQxIn0%3D",
                                    "distance": "5.84 miles from Honolulu International",
                                    "id": "187546341",
                                    "imageUrl": "https://content.skyscnr.com/available/1925781701/1925781701_WxH.jpg",
                                    "name": "Ala Moana Honolulu by Mantra",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_pi.png",
                                        "name": "Prestigia",
                                        "type": "OTA",
                                        "websiteId": "h_pi"
                                    },
                                    "price": "$282",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 41,
                                        "description": "Very Good",
                                        "fivePointsValue": 4.0,
                                        "value": 8.0
                                    },
                                    "rawPrice": 282.0,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=46943220&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjUyMS4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiNDY5NDMyMjAifQ%3D%3D",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1907654139/1907654139_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ct.png",
                                        "name": "Trip.com",
                                        "type": "OTA",
                                        "websiteId": "h_ct"
                                    },
                                    "price": "$521",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 119,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "value": 9.0
                                    },
                                    "rawPrice": 521.0,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2025-05-12&checkout=2025-05-15&entity_id=95673827&upsort_hotels=128477912&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2hfY2FjaGVfbWFwcGluZ19iIiwicHJpY2UiOjE4OC4wLCJjdXJyZW5jeSI6IlVTRCIsImhvdGVsX2lkIjoiMTI4NDc3OTEyIn0%3D",
                                    "distance": "1.42 miles from Honolulu International",
                                    "id": "128477912",
                                    "imageUrl": "https://content.skyscnr.com/available/2033396942/2033396942_WxH.jpg",
                                    "name": "Pacific Marina Inn",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_bc.png",
                                        "name": "Booking.com",
                                        "type": "OTA",
                                        "websiteId": "h_bc"
                                    },
                                    "price": "$188",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 61,
                                        "description": "Good",
                                        "fivePointsValue": 3.9000000953674316,
                                        "value": 7.800000190734863
                                    },
                                    "rawPrice": 188.0,
                                    "rawPricesFrom": 1,
                                    "stars": 2
                                }
                            ],
                            "name": "Free cancellation"
                        }
                    ],
                    "context": {
                        "sessionId": "b1920036fbcb49f2afe29f9b5aca84d8",
                        "status": "complete",
                        "totalResults": 9
                    },
                    "results": []
                },
                "brandCarousel": {
                    "buckets": null,
                    "context": {
                        "sessionId": "40ceb0db-2507-4c78-a5ed-ffffa2a89611",
                        "status": "complete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "brandInlines": {
                    "buckets": null,
                    "context": {
                        "sessionId": "40ceb0db-2507-4c78-a5ed-ffffa2a89611",
                        "status": "complete",
                        "totalResults": 1
                    },
                    "results": [
                        {
                            "creative": {
                                "fields": {
                                    "callToActionAccessibilityLabel": "Click and Save",
                                    "callToActionLabel": "Click and Save",
                                    "headline": "Save Up to 50% on Your Flight to Honolulu",
                                    "message": "Cheapest Fare Guarantee, 24x7 Support, 100% Secure Payment, Fly Now Pay Later",
                                    "partnerLogo": {
                                        "url": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2Fe2579db9f078a0900c630f531e990d49.png"
                                    },
                                    "partnerName": "Ezee Flights",
                                    "redirectUrl": "https://www.ezeeflights.com/flights/result?org=NYC&des=HNL&dDate=2025-5-12&rDate=2025-5-15&adt=1&chld=0&inf=0&cabin=economy&utm_source=scnbanner&utm_medium=cpc&utm_medium=cpc&utm_campaign=flight-search-deeplink&utm_campaign=flight-search-deeplink",
                                    "showTermsAndConditions": false,
                                    "whitePartnerLogo": {
                                        "url": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2Fe2579db9f078a0900c630f531e990d49.png"
                                    }
                                },
                                "type": "STANDARD_UNPRICED"
                            },
                            "trackingContext": {
                                "idCreative": "CAM-159fdeb2-4f30-41e2-93f3-fea7ce2624f2",
                                "idFormat": "fmt.flightsUnpricedBrandInline",
                                "idPlacement": "android.flights.combinedresults/global",
                                "idTracking": "b78e4e97-0674-4860-89c4-da231a3f1acd"
                            },
                            "trackingPixels": {
                                "click": [
                                    "/g/aps/public/api/v1/pixel/click?encryptedData=AfBroSLIjLyrwwYDQGvOmV4YgbvclulXqcaxcexOQu%2Fdiiac%2FjfrfdeK1LsGTX%2BsmMQQYd78zhkLo2ZOWldF5qBZSQltv15cWFuXgk7CNhWFBsN%2Fd5nAmrRpSjeZJJ%2F0puZfXp7bYICSNoRONtPxhB9FTfxTr0ELcEZTVn%2BPFMH6UxHrkg%2BKsIyI8EQHDvSguzvITvSPyaCYFsBQTMnbqkFTMMq5sG7CBtk90QKeTYT0VUVLC6%2Bh4S2puNrfPGK5RBNfAXwCSOfT86ZiuM77s%2BLQort4ifUk%2BmEyGi%2FFeqdO6HUsuRTOjqVeZaWlJPSaMcq1OndYCxPlPLgd%2ByyI2LxgQlJw4CBXzem9zBRCansmHljuQURfPbX8Raagpk%2B9t7ms0A4vKLD1BEjdL8%2FZoIi26ydGZ86KRGv7d1bVusgIZFZCzGATNfgUt5C8&updatedPosition=0"
                                ],
                                "engage": [
                                    "/g/aps/public/api/v1/pixel/engage?encryptedData=ATA3HMBdpk%2FRgVWcgzhFkUpbHMAhJqlA%2FlbtUeXUJnoNP6gU%2F%2FO%2FRe9LxmUZXqszxxAsjUT5YCpwbF0lRgLYMpIIX9INhJqNdDfVg8m8lefa%2FCqqfuWEwC2KTpcq%2BfUtQ8KguPR9gQNz4NH3fsiNIGNlilxd%2F8km1zscA2V3rPE5%2F031oMJqfjvi0dnXLDfbvh1PzwvJi6AvZKmv7jFRu5ZGCAbGG1ilju7eJnA62eBx65kyZFr7MXQ3i4%2FejWTVrk%2BXEVTQty8w%2Fj52pW%2Ba0k0W4nYR%2B4ip%2Fl0ofhmpKUuZHZdhbgC5An5kvCBJYd3gEZjxS0z0P5m%2BLLXo%2FY1Ajwk63aRvvscO9VIs%2Fb8vfnuitB8LP4tqZQez%2F%2F5y8OW7rbsNQ%2BBxpNYK0XLLWf6%2Br40lMOdX%2Fe9Me74sTxaUh1Xter2FuNI4%2FKMf9aJu&updatedPosition=0"
                                ],
                                "impression": [
                                    "/g/aps/public/api/v1/pixel/impression?encryptedData=AdhRhjJxXl8qTm0Jv2bbOrL7HwaCicDT1aSA7OPhPSjFMps%2F%2BQ2gCUtI3dkCJM1rHFFZXpeTwcWz2HuAfDzTmFF0rUIufZSXUhVu8aJTR5wpH%2Bp8GAk6YCZdEzr%2Bo1%2B4QqTu%2F1MHdey2A7Od0ii%2FNS0tENzZbaOe9lMefq93XykFkBWjRqiSfHIZG%2B%2FwJ%2FVDYaBSaeJttbFWWDnGEkcvAyGPq9bsA5PT8Zkpq%2BXLjufHjzm5rf%2B6m8aWigY5YagD2v34g4F2og7NfDAOQylPz%2Fe4Tlznrtuf%2FGM2mXZhlLdG4QgWAT5SJX9wjNDHw5Y9GjuuJBeakBDFOnKUPtqhrNT3a%2FW8gy8xsT6Wn5z6tKRF5qdsjl0UVudS%2BLLgy5AoI%2Bgbd8NqfQ%3D%3D&updatedPosition=0"
                                ],
                                "view": [
                                    "/g/aps/public/api/v1/pixel/view?encryptedData=AZ19s%2BdFbJp5S5sfn4sWN9kFr1wyNQSjflnxfxnoSPxzDKkKz2fP9PQv1Gq%2FW8MVQ%2F7soIn3wfRB563xcGAVbHpmhftSDQKRbT%2Bg3f9uBIiJKqbMiay8f2FL9nM8zTJ1mJ0SL4%2BIIlo3bPCZf4NI9srOyoF1Hv6GxhHv7JI1mVlSelmqadbpGqand3RaMihck20qNbhF65rMqqpQMFNISjsqEoPNagDt1WnYMsem5IeXepFvptKDnQfJ%2B%2FeR2h7By%2FUjBW1BNcYTp4qvpIikeynTe4WCL4CdYHlpBMAfywN1wKqa8UCvgsjNBWsmjeVR3wMfSvwy%2FjqdSali8hiMbKIVRk3CNwWVOqkVf3Q1%2BA2qP6q819WjCX6HX0tV4Ads1IeBK59l3KCXrEpPmK8rqeRR9%2B1HrwPC7cHg4iWNTUiqheQxbHvf0rlZhWUl&updatedPosition=0"
                                ]
                            }
                        }
                    ]
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
                                        "amount": 3340,
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
                                        "amount": 3592,
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
                                        "amount": 3692,
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
                                        "amount": 3774,
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
                                    "formattedTotalPrice": "$143",
                                    "groupKey": "premium",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/premium.png",
                                    "isAirconditioned": false,
                                    "price": {
                                        "amount": 4737,
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
                                        "amount": 5749,
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
                        "sessionId": "c45c3d50-fad9-4b6e-8360-76b4cefc31d2",
                        "status": "complete",
                        "totalResults": 6
                    },
                    "results": []
                },
                "context": {
                    "sessionId": "KLUv_SDVDQUAUkskH7C5AbRpGCoNk5pxJ3KzDLNR7tKWtMnmpeygiuJXywLOEyAuX32mLewGeb6X3OI7e3tk-Wpb-hWKIkkpujLur32nsOEGXWQLqbOs83J71f3zF4YmVo_z56PyyrZ39pVOn17oWmvJ0IMlbCmCwTHAaOuqJooACIaBMs6el6t9k2Pzzk17zbQ2ar95whTmCmBoWAQABPPiMIzGioMDwBM=",
                    "status": "complete"
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
                                    "adInfos": [
                                        {
                                            "appIndexList": [
                                                0
                                            ],
                                            "backgroundColor": "#4A2C88",
                                            "bannerImageUrl": null,
                                            "creativeId": "CAM-68139e51-913d-4125-8e35-5d0b1a9314b6",
                                            "format": "flightsItineraryInlinePlus",
                                            "formatId": "fmt.flightsItineraryInlinePlus",
                                            "headline": "Book confidently, fly safely.",
                                            "index": 0,
                                            "isDbook": null,
                                            "isOrganic": true,
                                            "message": null,
                                            "moreInfoLabel": null,
                                            "moreInfoTarget": null,
                                            "partner": "hawa",
                                            "partnerId": "hawa",
                                            "partnerLogoUrl": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2F79e8500eac7762307486e191a2c96f40.png?publicName=HAL_r_Wordmark_Logo_w.png",
                                            "partnerName": "Hawaiian Airlines",
                                            "partnerType": "airline",
                                            "placementId": "android.flights.combinedresults/inline",
                                            "price": {
                                                "formatted": "$778",
                                                "pricingOptionId": "avB2mQSR1q4N",
                                                "raw": 777.4
                                            },
                                            "redirectCityUrl": null,
                                            "redirectPageType": null,
                                            "redirectPlaceCode": null,
                                            "redirectUrl": "https://skyscanner.net/transport_deeplink/4.0/US/en-US/USD/hawa/2/12712.12240.2025-05-12,12240.12712.2025-05-15/air/airli/inlineads?itinerary=flight%7C-32249%7C51%7C12712%7C2025-05-12T09%3A05%7C12240%7C2025-05-12T13%3A55%7C650%7C-%7C-%7C-%2Cflight%7C-32249%7C50%7C12240%7C2025-05-15T15%3A15%7C12712%7C2025-05-16T06%3A55%7C580%7C-%7C-%7C-&carriers=-32249&operators=-32249%2C-32249&passengers=1&channel=android&cabin_class=economy&fps_session_id=40ceb0db-2507-4c78-a5ed-ffffa2a89611&ticket_price=777.40&is_npt=false&is_multipart=false&client_id=skyscanner_app&request_id=e42ecc17-af18-478c-81c2-7bf75489cb44&q_ids=H4sIAAAAAAAA_-NS4GLJSCxPFGLmWJEsxcxxIV6h4UvLQTaNhrtTDrIZMSkwAgAc1rvBIgAAAA%7C-206899865700160777%7C2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2025-05-11T10%3A46%3A15&pqid=false&fare_type=base_fare&facilitated=false&requested_depth=BOOKING_PAGE&creative_id=CAM-68139e51-913d-4125-8e35-5d0b1a9314b6_*%2F*%2F*%2F*%2F*%2F*%2F*%2F*&redirect_delay=0",
                                            "showMoreInfo": false,
                                            "sponsoredText": "Sponsored",
                                            "subHeadline": "Say aloha to effortless travel.",
                                            "textColor": "#FFFFFF",
                                            "trackingId": "661638e8-e11d-49b5-b7c2-0ca9c425f11b",
                                            "trackingPixels": {
                                                "clickUrls": [
                                                    "/g/aps/public/api/v1/pixel/click?encryptedData=AT9CsWC2y8J29zi4%2BgEC7%2FPERA6%2B3Ccr%2F7kFGw03z%2BgLHuPP75VdOMcxkFSMtw2FeJuRbfHwL%2FffEA3LKBjO%2FIHdDpVI5owI0mrosPRrn1QOzhKzn6M1zcEeywtepbKdwsCoQeg4TXctk%2F0QE2aZ3w4WOLQtLQwZ8UxdKmMiFxWoJJCcRAhDNHkidbtN6ArIkKrWsTRcVFPqXVjDk5w11EJ89EsmVevf%2Buf1lBOqw2I0ZXH56f25I8yjk7%2FnKjzZZdnr3mJWiVrB4jiiNNSqM3vXZZ4Er0RGVXYUlPB5rIk%2B7L6NVvKhXOpsPPbJifk2sFlMUixJ4lJx1tAzwSOzhaJVFReFt1yWAcfF5ZN0SwnuhOCiccIjdeaN8Ab021C7Gd%2BvOoJC%2BWr%2BtY2lOG1ll%2BHkJcGjenaSQQ13iURg%2FQOrG0WJOKlBK2L08ifz%2FIqqlI%2BWzQXSSH9yk82bAqQclOiZvCqlbGuuIZIxVOWyyM1h1ZQIIg%2BFnENYqX%2FmK3Sy0sWdoSKfRtXCT0Jbg6%2Fb2zOcSEredssLU6jb235qW0zm8j8O7RBwuKNGpPVN%2BRxFkpsSYeZlQgBY4NreNC%2F8sboeGg59i6q4fzXD5bc41KRWKyAJQNHRHCa8PBZPOKtmoPiwFVIl%2B4sSYRbxyiSM5BNbLeOx3rdUz5Lp2GUGq4U4aiUBld9OQgCo8fFYcGKmI8EolmLBaDHGr6BgAWPJz5Y5U31v6%2Bl3dOGx"
                                                ],
                                                "engageUrls": [
                                                    "/g/aps/public/api/v1/pixel/engage?encryptedData=AbHuQYzecKp3joPCiRPf74fjbYGN8g67YNbEXN%2FbRyEpI1HyMmTrwmxcZSoL9aB%2BgEkSa4gF5NKs5sMu%2Fd%2FW9JXIxjhRhR4BZTHWFWo9K39cldMFHW%2FcCDGGsxOx33nq%2Bi5VT0OLlwLUATsygR18Sr33QVAt3aUgdfm1af0c9cdbin0FjAfODLnbKafiSP6xBgeIzQZ0IOYQKExAW%2FXdfwIImSkfA%2FDl4KJKJlMhxCTbfPvNKe38zV5rANwrIUOiwbQWsFscdby4vKnM5C2hWdiB%2FsPzio2c2GnWQBmw2U92E1PdW7RN6DCZv3o96gDwTG2TvD8ksvJRZX0XoWSUNF%2FcHtVHM2he0O5eBAalFh46XIRFnGd5gpSqgixwmWNPg6fX4ejI7fHcAgj2k84ggRRLOYal4fyw%2FW%2FBevWH5Mg9m4gTc3ZNy1GbZfBRsYk5QcR%2Bo3hW616%2FFYoReBp5Wt5d3LfeUA0IaE3VstMMrosD4yNgdat3hLnb%2B1bJOEdhUpYsNhcwJpDO7aYprBpm9DhxTD7Ox%2B8qzszdL1lZ5VRKWQECUZ9MWqWChlYLNmvWv2h0CBrXF0EcxYJ5uSfIbIgf5eQjVvL7WIKrddVuhw96wtsElrnrnA98JZTj8EJunlr8bRl9k%2Fy1%2FhzzHndh83wCFgj1awo4fBzl0SXVXNRPZA2d8Gvgtrca7JMHDcdZKuadIsJeuesnpr33ke1DTdknDjTGZWFOuMnRl%2Fh8nCA%2Fz232G0BBoxLfeNwrfGV0jITWOc4fFn%2FkziF%2FJkq94%2BOKz%2Fm3QwXT0PLN%2BskRRqaBGs8yKYmxda2o0yLcwNFnsu%2FwFKDtkL1AYUAoIvVl0fSN"
                                                ],
                                                "impressionUrls": [
                                                    "/g/aps/public/api/v1/pixel/impression?encryptedData=AeVpxR2AqJDrZzm%2BR89snswN1T%2BIroO6vN%2FKSElttY83iz1evaXCmo9Pbpt61QRkmdg3USlEssyAgjwjeKx0i0A41rXCXvvqg0oOtOhrd%2BT%2BN5pkeOICBIOPlySYXL0Wfn8Le5SHyegyjt7GwJQTfpXYlbcBUeGb6kyZkI%2BJ%2Fd1Ru%2Fn2vD%2FtodJbgEu4xbnjCLY90e3cGkCuTZBAbUMKAad5DT4HkB4DRSc539nATtXgfbY%2BdHImlc2sT36a0Dl3C0NsCGdtd8ZpYNmaJ3LFBsqHgTblkgvK7nqImW43VD8yolILsbopeqauaw0fSseZ9MsXok6q77Kk4jGCZia%2FKoAliEAkC630%2BrSo4L1J%2FIPlorRKAANIZQLjZJ9vsil5QrXQmt4G3VkVIFOQIvP00A42p01WGNkLBduuat3fXmnf1vQmYadggY0TrJ3VEVV7Vrj75B9c8Ra2ysn28n2WSdG8n0kr5yd5D0FGdhAwcmhdFLwH2jGrfegwcdqkhuxVPtnAj6hbcRRu5IGVNWlj%2B6Em9e21dg9E6O31Xt76u%2Fxcd5gF4Sa70EBIoQrr2ZtjIB6bPNLeiJUNIZTJThZUzGm0N6NB842C1cvoDCjOC5O5NfABD4pZxNglJGal0qqcLfWGgkB1YCPxLenXrYDLujBhxZirEob8XcWPXo5rljO3xhyMdA%3D%3D"
                                                ],
                                                "viewUrls": [
                                                    "/g/aps/public/api/v1/pixel/view?encryptedData=AS%2Bi2IFC51sJdXezzDxF64QpybLkkk2ZC4FkYMMxN16ZnzVTKZr0G7XO1lITPjamb96EbnjibwpCGcGF%2BdWl%2FiERtefCyhteWvkCHx8SjcguqFgnc8s%2Bwki%2FbbxJA2KcygqXgnWBYfyYwlmY4AJ0RJr2Jktbeh9XaTfGI2u4XOUbzycX7%2B9qep2znWUhms%2Fr63SMmlCdPvZuzdv1mhInHeJ86mDI8xG7B5%2FnMSHvDvGXwAouDvzkqNWkIETAtifSsKWlS0lw7MhkpzJ9SN4wuaQK7EPKQACdPbGq10oyYSUqlKwWQq%2B6RpK%2BAAe7GTUdWw3KnoTtsx3RHI8Rob3ijg%2BuCiLw8Mak%2BYr3WQZfGRnWnaYcW8Qx2TgsVq%2BWQf9yUpx002ar67Mv8u0kcZ1%2BKIYdc1%2Bkxf9qryj0ZYg8%2FY8APjnRzls%2BXuQ2UzE59oSMAGKFG399o%2F%2Bgm8ESUkfPAJcFvNwptFzoZOkdnyTO3t%2F8H6wO1aFFCZE7g5%2FTUudLlas0pSDpDUsW%2BDAkDhOqH07q%2FNEXl%2BD60V3Ku7g%2B2Cw5DxnU%2B7l4%2Bm5f6B342tWINZMGd7eb37ceHM3vNoaH7XYhwxG6cQX1o495vmCYsWkTFdf0MGusQwyiBeBdazjgIixzgpxD4YMX8%2Fx70M2ZiwerU2F%2Bq9hGCkZc0gL%2FHO3V5lagUelhcHm1tjLIHuuu02eqx%2B%2FAXvbxH%2FY0kkImcyxituhjhLtV99Npw2JeZKOqX6Bopj1k%2BHEbhPWD7mhAOZNcg%2Bog5cZeiAIlerSmswrtyQ%2FzlPlfUpVeDOknQiUJQdkRGETDypzeYuFnGHWe0znkE4WvjWueCdTqyw1FZ%2Bf7"
                                                ]
                                            }
                                        }
                                    ],
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
                                        "shortest"
                                    ]
                                },
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
                                    "score": 0.77533,
                                    "tags": [
                                        "second_cheapest"
                                    ]
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
                                    "score": 0.774464
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
                                    "score": 0.767955
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
                                    "score": 0.758452
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
                                    "adInfos": [
                                        {
                                            "appIndexList": [
                                                0
                                            ],
                                            "backgroundColor": "#4A2C88",
                                            "bannerImageUrl": null,
                                            "creativeId": "CAM-68139e51-913d-4125-8e35-5d0b1a9314b6",
                                            "format": "flightsItineraryInlinePlus",
                                            "formatId": "fmt.flightsItineraryInlinePlus",
                                            "headline": "Book confidently, fly safely.",
                                            "index": 0,
                                            "isDbook": null,
                                            "isOrganic": false,
                                            "message": null,
                                            "moreInfoLabel": null,
                                            "moreInfoTarget": null,
                                            "partner": "hawa",
                                            "partnerId": "hawa",
                                            "partnerLogoUrl": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2F79e8500eac7762307486e191a2c96f40.png?publicName=HAL_r_Wordmark_Logo_w.png",
                                            "partnerName": "Hawaiian Airlines",
                                            "partnerType": "airline",
                                            "placementId": "android.flights.combinedresults/inline",
                                            "price": {
                                                "formatted": "$778",
                                                "pricingOptionId": "avB2mQSR1q4N",
                                                "raw": 777.4
                                            },
                                            "redirectCityUrl": null,
                                            "redirectPageType": null,
                                            "redirectPlaceCode": null,
                                            "redirectUrl": "https://skyscanner.net/transport_deeplink/4.0/US/en-US/USD/hawa/2/12712.12240.2025-05-12,12240.12712.2025-05-15/air/airli/inlineads?itinerary=flight%7C-32249%7C51%7C12712%7C2025-05-12T09%3A05%7C12240%7C2025-05-12T13%3A55%7C650%7C-%7C-%7C-%2Cflight%7C-32249%7C50%7C12240%7C2025-05-15T15%3A15%7C12712%7C2025-05-16T06%3A55%7C580%7C-%7C-%7C-&carriers=-32249&operators=-32249%2C-32249&passengers=1&channel=android&cabin_class=economy&fps_session_id=40ceb0db-2507-4c78-a5ed-ffffa2a89611&ticket_price=777.40&is_npt=false&is_multipart=false&client_id=skyscanner_app&request_id=e42ecc17-af18-478c-81c2-7bf75489cb44&q_ids=H4sIAAAAAAAA_-NS4GLJSCxPFGLmWJEsxcxxIV6h4UvLQTaNhrtTDrIZMSkwAgAc1rvBIgAAAA%7C-206899865700160777%7C2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2025-05-11T10%3A46%3A15&pqid=false&fare_type=base_fare&facilitated=false&requested_depth=BOOKING_PAGE&creative_id=CAM-68139e51-913d-4125-8e35-5d0b1a9314b6_*%2F*%2F*%2F*%2F*%2F*%2F*%2F*&redirect_delay=0",
                                            "showMoreInfo": false,
                                            "sponsoredText": "Sponsored",
                                            "subHeadline": "Say aloha to effortless travel.",
                                            "textColor": "#FFFFFF",
                                            "trackingId": "661638e8-e11d-49b5-b7c2-0ca9c425f11b",
                                            "trackingPixels": {
                                                "clickUrls": [
                                                    "/g/aps/public/api/v1/pixel/click?encryptedData=AT9CsWC2y8J29zi4%2BgEC7%2FPERA6%2B3Ccr%2F7kFGw03z%2BgLHuPP75VdOMcxkFSMtw2FeJuRbfHwL%2FffEA3LKBjO%2FIHdDpVI5owI0mrosPRrn1QOzhKzn6M1zcEeywtepbKdwsCoQeg4TXctk%2F0QE2aZ3w4WOLQtLQwZ8UxdKmMiFxWoJJCcRAhDNHkidbtN6ArIkKrWsTRcVFPqXVjDk5w11EJ89EsmVevf%2Buf1lBOqw2I0ZXH56f25I8yjk7%2FnKjzZZdnr3mJWiVrB4jiiNNSqM3vXZZ4Er0RGVXYUlPB5rIk%2B7L6NVvKhXOpsPPbJifk2sFlMUixJ4lJx1tAzwSOzhaJVFReFt1yWAcfF5ZN0SwnuhOCiccIjdeaN8Ab021C7Gd%2BvOoJC%2BWr%2BtY2lOG1ll%2BHkJcGjenaSQQ13iURg%2FQOrG0WJOKlBK2L08ifz%2FIqqlI%2BWzQXSSH9yk82bAqQclOiZvCqlbGuuIZIxVOWyyM1h1ZQIIg%2BFnENYqX%2FmK3Sy0sWdoSKfRtXCT0Jbg6%2Fb2zOcSEredssLU6jb235qW0zm8j8O7RBwuKNGpPVN%2BRxFkpsSYeZlQgBY4NreNC%2F8sboeGg59i6q4fzXD5bc41KRWKyAJQNHRHCa8PBZPOKtmoPiwFVIl%2B4sSYRbxyiSM5BNbLeOx3rdUz5Lp2GUGq4U4aiUBld9OQgCo8fFYcGKmI8EolmLBaDHGr6BgAWPJz5Y5U31v6%2Bl3dOGx&updatedPosition=1"
                                                ],
                                                "engageUrls": [
                                                    "/g/aps/public/api/v1/pixel/engage?encryptedData=AbHuQYzecKp3joPCiRPf74fjbYGN8g67YNbEXN%2FbRyEpI1HyMmTrwmxcZSoL9aB%2BgEkSa4gF5NKs5sMu%2Fd%2FW9JXIxjhRhR4BZTHWFWo9K39cldMFHW%2FcCDGGsxOx33nq%2Bi5VT0OLlwLUATsygR18Sr33QVAt3aUgdfm1af0c9cdbin0FjAfODLnbKafiSP6xBgeIzQZ0IOYQKExAW%2FXdfwIImSkfA%2FDl4KJKJlMhxCTbfPvNKe38zV5rANwrIUOiwbQWsFscdby4vKnM5C2hWdiB%2FsPzio2c2GnWQBmw2U92E1PdW7RN6DCZv3o96gDwTG2TvD8ksvJRZX0XoWSUNF%2FcHtVHM2he0O5eBAalFh46XIRFnGd5gpSqgixwmWNPg6fX4ejI7fHcAgj2k84ggRRLOYal4fyw%2FW%2FBevWH5Mg9m4gTc3ZNy1GbZfBRsYk5QcR%2Bo3hW616%2FFYoReBp5Wt5d3LfeUA0IaE3VstMMrosD4yNgdat3hLnb%2B1bJOEdhUpYsNhcwJpDO7aYprBpm9DhxTD7Ox%2B8qzszdL1lZ5VRKWQECUZ9MWqWChlYLNmvWv2h0CBrXF0EcxYJ5uSfIbIgf5eQjVvL7WIKrddVuhw96wtsElrnrnA98JZTj8EJunlr8bRl9k%2Fy1%2FhzzHndh83wCFgj1awo4fBzl0SXVXNRPZA2d8Gvgtrca7JMHDcdZKuadIsJeuesnpr33ke1DTdknDjTGZWFOuMnRl%2Fh8nCA%2Fz232G0BBoxLfeNwrfGV0jITWOc4fFn%2FkziF%2FJkq94%2BOKz%2Fm3QwXT0PLN%2BskRRqaBGs8yKYmxda2o0yLcwNFnsu%2FwFKDtkL1AYUAoIvVl0fSN&updatedPosition=1"
                                                ],
                                                "impressionUrls": [
                                                    "/g/aps/public/api/v1/pixel/impression?encryptedData=AeVpxR2AqJDrZzm%2BR89snswN1T%2BIroO6vN%2FKSElttY83iz1evaXCmo9Pbpt61QRkmdg3USlEssyAgjwjeKx0i0A41rXCXvvqg0oOtOhrd%2BT%2BN5pkeOICBIOPlySYXL0Wfn8Le5SHyegyjt7GwJQTfpXYlbcBUeGb6kyZkI%2BJ%2Fd1Ru%2Fn2vD%2FtodJbgEu4xbnjCLY90e3cGkCuTZBAbUMKAad5DT4HkB4DRSc539nATtXgfbY%2BdHImlc2sT36a0Dl3C0NsCGdtd8ZpYNmaJ3LFBsqHgTblkgvK7nqImW43VD8yolILsbopeqauaw0fSseZ9MsXok6q77Kk4jGCZia%2FKoAliEAkC630%2BrSo4L1J%2FIPlorRKAANIZQLjZJ9vsil5QrXQmt4G3VkVIFOQIvP00A42p01WGNkLBduuat3fXmnf1vQmYadggY0TrJ3VEVV7Vrj75B9c8Ra2ysn28n2WSdG8n0kr5yd5D0FGdhAwcmhdFLwH2jGrfegwcdqkhuxVPtnAj6hbcRRu5IGVNWlj%2B6Em9e21dg9E6O31Xt76u%2Fxcd5gF4Sa70EBIoQrr2ZtjIB6bPNLeiJUNIZTJThZUzGm0N6NB842C1cvoDCjOC5O5NfABD4pZxNglJGal0qqcLfWGgkB1YCPxLenXrYDLujBhxZirEob8XcWPXo5rljO3xhyMdA%3D%3D&updatedPosition=1"
                                                ],
                                                "viewUrls": [
                                                    "/g/aps/public/api/v1/pixel/view?encryptedData=AS%2Bi2IFC51sJdXezzDxF64QpybLkkk2ZC4FkYMMxN16ZnzVTKZr0G7XO1lITPjamb96EbnjibwpCGcGF%2BdWl%2FiERtefCyhteWvkCHx8SjcguqFgnc8s%2Bwki%2FbbxJA2KcygqXgnWBYfyYwlmY4AJ0RJr2Jktbeh9XaTfGI2u4XOUbzycX7%2B9qep2znWUhms%2Fr63SMmlCdPvZuzdv1mhInHeJ86mDI8xG7B5%2FnMSHvDvGXwAouDvzkqNWkIETAtifSsKWlS0lw7MhkpzJ9SN4wuaQK7EPKQACdPbGq10oyYSUqlKwWQq%2B6RpK%2BAAe7GTUdWw3KnoTtsx3RHI8Rob3ijg%2BuCiLw8Mak%2BYr3WQZfGRnWnaYcW8Qx2TgsVq%2BWQf9yUpx002ar67Mv8u0kcZ1%2BKIYdc1%2Bkxf9qryj0ZYg8%2FY8APjnRzls%2BXuQ2UzE59oSMAGKFG399o%2F%2Bgm8ESUkfPAJcFvNwptFzoZOkdnyTO3t%2F8H6wO1aFFCZE7g5%2FTUudLlas0pSDpDUsW%2BDAkDhOqH07q%2FNEXl%2BD60V3Ku7g%2B2Cw5DxnU%2B7l4%2Bm5f6B342tWINZMGd7eb37ceHM3vNoaH7XYhwxG6cQX1o495vmCYsWkTFdf0MGusQwyiBeBdazjgIixzgpxD4YMX8%2Fx70M2ZiwerU2F%2Bq9hGCkZc0gL%2FHO3V5lagUelhcHm1tjLIHuuu02eqx%2B%2FAXvbxH%2FY0kkImcyxituhjhLtV99Npw2JeZKOqX6Bopj1k%2BHEbhPWD7mhAOZNcg%2Bog5cZeiAIlerSmswrtyQ%2FzlPlfUpVeDOknQiUJQdkRGETDypzeYuFnGHWe0znkE4WvjWueCdTqyw1FZ%2Bf7&updatedPosition=1"
                                                ]
                                            }
                                        }
                                    ],
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
                                    "score": 0.98460037,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505122130--32573-1-12240-2505131147|12240-2505152130--32573-1-12712-2505161528",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-13T11:47:00",
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
                                            "departure": "2025-05-12T21:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 1217,
                                            "id": "12712-2505122130--32573-1-12240-2505131147",
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
                                                    "arrival": "2025-05-13T00:48:00",
                                                    "departure": "2025-05-12T21:30:00",
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
                                                    "durationInMinutes": 378,
                                                    "flightNumber": "300",
                                                    "id": "12712-13416-2505122130-2505130048--32573",
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
                                                    "arrival": "2025-05-13T11:47:00",
                                                    "departure": "2025-05-13T08:55:00",
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
                                                    "durationInMinutes": 352,
                                                    "flightNumber": "31",
                                                    "id": "13416-12240-2505130855-2505131147--32573",
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
                                                "isHighlighted": false,
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
                                        "formatted": "$687",
                                        "pricingOptionId": "9FfVmPWu6QX6",
                                        "raw": 686.79
                                    },
                                    "score": 0.9997241,
                                    "tags": [
                                        "cheapest"
                                    ]
                                },
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
                                    "score": 0.99565625,
                                    "tags": [
                                        "second_cheapest"
                                    ]
                                },
                                {
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505152345--32593-1-11442-2505161829",
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
                                            "arrival": "2025-05-16T18:29:00",
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
                                            "departure": "2025-05-15T23:45:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 764,
                                            "id": "12240-2505152345--32593-1-11442-2505161829",
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
                                                    "arrival": "2025-05-16T08:35:00",
                                                    "departure": "2025-05-15T23:45:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "SEA",
                                                        "flightPlaceId": "SEA",
                                                        "name": "Seattle / Tacoma International",
                                                        "parent": {
                                                            "displayCode": "SEA",
                                                            "flightPlaceId": "SEAA",
                                                            "name": "Seattle",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 350,
                                                    "flightNumber": "8028",
                                                    "id": "12240-16177-2505152345-2505160835--32593",
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
                                                    "arrival": "2025-05-16T18:29:00",
                                                    "departure": "2025-05-16T10:05:00",
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
                                                    "durationInMinutes": 324,
                                                    "flightNumber": "398",
                                                    "id": "16177-11442-2505161005-2505161829--32593",
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
                                                        "displayCode": "SEA",
                                                        "flightPlaceId": "SEA",
                                                        "name": "Seattle / Tacoma International",
                                                        "parent": {
                                                            "displayCode": "SEA",
                                                            "flightPlaceId": "SEAA",
                                                            "name": "Seattle",
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
                                        "formatted": "$748",
                                        "pricingOptionId": "D1gD6_Ky2x3G",
                                        "raw": 747.6
                                    },
                                    "score": 0.9895931,
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
                                    "score": 0.9893659,
                                    "tags": [
                                        "shortest"
                                    ]
                                },
                                {
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2505122145--31829-2-12240-2505131150|12240-2505151115--31829-2-13522-2505161000",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-13T11:50:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "WN",
                                                        "id": -31829,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/WN.png",
                                                        "name": "Southwest Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T21:45:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 1205,
                                            "id": "13522-2505122145--31829-2-12240-2505131150",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "LGA",
                                                "entityId": "95565057",
                                                "id": "LGA",
                                                "isHighlighted": false,
                                                "name": "New York LaGuardia"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-13T00:10:00",
                                                    "departure": "2025-05-12T21:45:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "DEN",
                                                        "flightPlaceId": "DEN",
                                                        "name": "Denver International",
                                                        "parent": {
                                                            "displayCode": "DEN",
                                                            "flightPlaceId": "DENA",
                                                            "name": "Denver",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 265,
                                                    "flightNumber": "4491",
                                                    "id": "13522-10959-2505122145-2505130010--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LGA",
                                                        "flightPlaceId": "LGA",
                                                        "name": "New York LaGuardia",
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
                                                    "arrival": "2025-05-13T07:10:00",
                                                    "departure": "2025-05-13T06:10:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAS",
                                                        "flightPlaceId": "LAS",
                                                        "name": "Las Vegas Harry Reid International",
                                                        "parent": {
                                                            "displayCode": "LAS",
                                                            "flightPlaceId": "LASA",
                                                            "name": "Las Vegas",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 120,
                                                    "flightNumber": "1473",
                                                    "id": "10959-13411-2505130610-2505130710--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "DEN",
                                                        "flightPlaceId": "DEN",
                                                        "name": "Denver International",
                                                        "parent": {
                                                            "displayCode": "DEN",
                                                            "flightPlaceId": "DENA",
                                                            "name": "Denver",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-13T11:50:00",
                                                    "departure": "2025-05-13T08:30:00",
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
                                                    "durationInMinutes": 380,
                                                    "flightNumber": "824",
                                                    "id": "13411-12240-2505130830-2505131150--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAS",
                                                        "flightPlaceId": "LAS",
                                                        "name": "Las Vegas Harry Reid International",
                                                        "parent": {
                                                            "displayCode": "LAS",
                                                            "flightPlaceId": "LASA",
                                                            "name": "Las Vegas",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 2,
                                            "timeDeltaInDays": 1
                                        },
                                        {
                                            "arrival": "2025-05-16T10:00:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "WN",
                                                        "id": -31829,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/WN.png",
                                                        "name": "Southwest Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T11:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "LGA",
                                                "entityId": "95565057",
                                                "id": "LGA",
                                                "isHighlighted": false,
                                                "name": "New York LaGuardia"
                                            },
                                            "durationInMinutes": 1005,
                                            "id": "12240-2505151115--31829-2-13522-2505161000",
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
                                                    "arrival": "2025-05-15T20:10:00",
                                                    "departure": "2025-05-15T11:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LAS",
                                                        "flightPlaceId": "LAS",
                                                        "name": "Las Vegas Harry Reid International",
                                                        "parent": {
                                                            "displayCode": "LAS",
                                                            "flightPlaceId": "LASA",
                                                            "name": "Las Vegas",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 355,
                                                    "flightNumber": "2641",
                                                    "id": "12240-13411-2505151115-2505152010--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
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
                                                    "arrival": "2025-05-16T05:00:00",
                                                    "departure": "2025-05-15T23:20:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "BNA",
                                                        "flightPlaceId": "BNA",
                                                        "name": "Nashville",
                                                        "parent": {
                                                            "displayCode": "BNA",
                                                            "flightPlaceId": "BNAA",
                                                            "name": "Nashville",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 220,
                                                    "flightNumber": "4521",
                                                    "id": "13411-10037-2505152320-2505160500--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LAS",
                                                        "flightPlaceId": "LAS",
                                                        "name": "Las Vegas Harry Reid International",
                                                        "parent": {
                                                            "displayCode": "LAS",
                                                            "flightPlaceId": "LASA",
                                                            "name": "Las Vegas",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-16T10:00:00",
                                                    "departure": "2025-05-16T06:45:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "LGA",
                                                        "flightPlaceId": "LGA",
                                                        "name": "New York LaGuardia",
                                                        "parent": {
                                                            "displayCode": "NYC",
                                                            "flightPlaceId": "NYCA",
                                                            "name": "New York",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 135,
                                                    "flightNumber": "2625",
                                                    "id": "10037-13522-2505160645-2505161000--31829",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "WN",
                                                        "displayCode": "",
                                                        "id": -31829,
                                                        "name": "Southwest Airlines"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "BNA",
                                                        "flightPlaceId": "BNA",
                                                        "name": "Nashville",
                                                        "parent": {
                                                            "displayCode": "BNA",
                                                            "flightPlaceId": "BNAA",
                                                            "name": "Nashville",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                }
                                            ],
                                            "stopCount": 2,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$757",
                                        "pricingOptionId": "ju93oeWeiN2i",
                                        "raw": 756.8
                                    },
                                    "score": 0.98771787
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 8.298045
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "11442-2505121529--32593-1-12240-2505122240|12240-2505151515--32593-0-12712-2505160655",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T22:40:00",
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
                                            "departure": "2025-05-12T15:29:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 791,
                                            "id": "11442-2505121529--32593-1-12240-2505122240",
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
                                                    "arrival": "2025-05-12T19:02:00",
                                                    "departure": "2025-05-12T15:29:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "SFO",
                                                        "flightPlaceId": "SFO",
                                                        "name": "San Francisco International",
                                                        "parent": {
                                                            "displayCode": "SFO",
                                                            "flightPlaceId": "SFOA",
                                                            "name": "San Francisco",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 393,
                                                    "flightNumber": "293",
                                                    "id": "11442-16216-2505121529-2505121902--32593",
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
                                                    "arrival": "2025-05-12T22:40:00",
                                                    "departure": "2025-05-12T19:50:00",
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
                                                    "durationInMinutes": 350,
                                                    "flightNumber": "8123",
                                                    "id": "16216-12240-2505121950-2505122240--32593",
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
                                                        "displayCode": "SFO",
                                                        "flightPlaceId": "SFO",
                                                        "name": "San Francisco International",
                                                        "parent": {
                                                            "displayCode": "SFO",
                                                            "flightPlaceId": "SFOA",
                                                            "name": "San Francisco",
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
                                                "isHighlighted": true,
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
                                        "formatted": "$764",
                                        "pricingOptionId": "pYDhDxXzTsC1",
                                        "raw": 763.37
                                    },
                                    "score": 0.98692966
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 9.08317
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2505121125--31722-2-12240-2505121958|12240-2505151715--31722-1-11442-2505161026",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T19:58:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "UA",
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T11:25:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 873,
                                            "id": "13522-2505121125--31722-2-12240-2505121958",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "LGA",
                                                "entityId": "95565057",
                                                "id": "LGA",
                                                "isHighlighted": true,
                                                "name": "New York LaGuardia"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:06:00",
                                                    "departure": "2025-05-12T11:25:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 161,
                                                    "flightNumber": "2618",
                                                    "id": "13522-15062-2505121125-2505121306--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LGA",
                                                        "flightPlaceId": "LGA",
                                                        "name": "New York LaGuardia",
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
                                                    "arrival": "2025-05-12T16:38:00",
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
                                                    "durationInMinutes": 283,
                                                    "flightNumber": "378",
                                                    "id": "15062-13416-2505121355-2505121638--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T19:58:00",
                                                    "departure": "2025-05-12T17:10:00",
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
                                                    "durationInMinutes": 348,
                                                    "flightNumber": "1170",
                                                    "id": "13416-12240-2505121710-2505121958--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
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
                                            "stopCount": 2,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T10:26:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "UA",
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T17:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 671,
                                            "id": "12240-2505151715--31722-1-11442-2505161026",
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
                                                    "arrival": "2025-05-16T06:25:00",
                                                    "departure": "2025-05-15T17:15:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 490,
                                                    "flightNumber": "218",
                                                    "id": "12240-15062-2505151715-2505160625--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
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
                                                    "arrival": "2025-05-16T10:26:00",
                                                    "departure": "2025-05-16T07:10:00",
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
                                                    "durationInMinutes": 136,
                                                    "flightNumber": "563",
                                                    "id": "15062-11442-2505160710-2505161026--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
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
                                        "formatted": "$765",
                                        "pricingOptionId": "akSILFv6nqqd",
                                        "raw": 765.0
                                    },
                                    "score": 0.9865849
                                },
                                {
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2505121125--31722-2-12240-2505121958|12240-2505152205--31722-1-11442-2505161537",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2025-05-12T19:58:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "UA",
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-12T11:25:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 873,
                                            "id": "13522-2505121125--31722-2-12240-2505121958",
                                            "isSmallestStops": false,
                                            "origin": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "LGA",
                                                "entityId": "95565057",
                                                "id": "LGA",
                                                "isHighlighted": true,
                                                "name": "New York LaGuardia"
                                            },
                                            "segments": [
                                                {
                                                    "arrival": "2025-05-12T13:06:00",
                                                    "departure": "2025-05-12T11:25:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 161,
                                                    "flightNumber": "2618",
                                                    "id": "13522-15062-2505121125-2505121306--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "LGA",
                                                        "flightPlaceId": "LGA",
                                                        "name": "New York LaGuardia",
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
                                                    "arrival": "2025-05-12T16:38:00",
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
                                                    "durationInMinutes": 283,
                                                    "flightNumber": "378",
                                                    "id": "15062-13416-2505121355-2505121638--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "ORD",
                                                        "flightPlaceId": "ORD",
                                                        "name": "Chicago O'Hare International",
                                                        "parent": {
                                                            "displayCode": "CHI",
                                                            "flightPlaceId": "CHIA",
                                                            "name": "Chicago",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "transportMode": "TRANSPORT_MODE_FLIGHT"
                                                },
                                                {
                                                    "arrival": "2025-05-12T19:58:00",
                                                    "departure": "2025-05-12T17:10:00",
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
                                                    "durationInMinutes": 348,
                                                    "flightNumber": "1170",
                                                    "id": "13416-12240-2505121710-2505121958--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
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
                                            "stopCount": 2,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2025-05-16T15:37:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "alternateId": "UA",
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2025-05-15T22:05:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 692,
                                            "id": "12240-2505152205--31722-1-11442-2505161537",
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
                                                    "arrival": "2025-05-16T06:13:00",
                                                    "departure": "2025-05-15T22:05:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "SFO",
                                                        "flightPlaceId": "SFO",
                                                        "name": "San Francisco International",
                                                        "parent": {
                                                            "displayCode": "SFO",
                                                            "flightPlaceId": "SFOA",
                                                            "name": "San Francisco",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 308,
                                                    "flightNumber": "1947",
                                                    "id": "12240-16216-2505152205-2505160613--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
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
                                                    "arrival": "2025-05-16T15:37:00",
                                                    "departure": "2025-05-16T07:00:00",
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
                                                    "durationInMinutes": 337,
                                                    "flightNumber": "1402",
                                                    "id": "16216-11442-2505160700-2505161537--31722",
                                                    "marketingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "operatingCarrier": {
                                                        "allianceId": 0,
                                                        "alternateId": "UA",
                                                        "displayCode": "",
                                                        "id": -31722,
                                                        "name": "United"
                                                    },
                                                    "origin": {
                                                        "country": "United States",
                                                        "displayCode": "SFO",
                                                        "flightPlaceId": "SFO",
                                                        "name": "San Francisco International",
                                                        "parent": {
                                                            "displayCode": "SFO",
                                                            "flightPlaceId": "SFOA",
                                                            "name": "San Francisco",
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
                                        "formatted": "$765",
                                        "pricingOptionId": "zxF_1f3cgOq4",
                                        "raw": 765.0
                                    },
                                    "score": 0.9865767
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
                                    "score": 0.9999894,
                                    "tags": [
                                        "shortest"
                                    ]
                                },
                                {
                                    "adInfos": [
                                        {
                                            "appIndexList": [
                                                0
                                            ],
                                            "backgroundColor": "#4A2C88",
                                            "bannerImageUrl": null,
                                            "creativeId": "CAM-68139e51-913d-4125-8e35-5d0b1a9314b6",
                                            "format": "flightsItineraryInlinePlus",
                                            "formatId": "fmt.flightsItineraryInlinePlus",
                                            "headline": "Book confidently, fly safely.",
                                            "index": 0,
                                            "isDbook": null,
                                            "isOrganic": true,
                                            "message": null,
                                            "moreInfoLabel": null,
                                            "moreInfoTarget": null,
                                            "partner": "hawa",
                                            "partnerId": "hawa",
                                            "partnerLogoUrl": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2F79e8500eac7762307486e191a2c96f40.png?publicName=HAL_r_Wordmark_Logo_w.png",
                                            "partnerName": "Hawaiian Airlines",
                                            "partnerType": "airline",
                                            "placementId": "android.flights.combinedresults/inline",
                                            "price": {
                                                "formatted": "$778",
                                                "pricingOptionId": "avB2mQSR1q4N",
                                                "raw": 777.4
                                            },
                                            "redirectCityUrl": null,
                                            "redirectPageType": null,
                                            "redirectPlaceCode": null,
                                            "redirectUrl": "https://skyscanner.net/transport_deeplink/4.0/US/en-US/USD/hawa/2/12712.12240.2025-05-12,12240.12712.2025-05-15/air/airli/inlineads?itinerary=flight%7C-32249%7C51%7C12712%7C2025-05-12T09%3A05%7C12240%7C2025-05-12T13%3A55%7C650%7C-%7C-%7C-%2Cflight%7C-32249%7C50%7C12240%7C2025-05-15T15%3A15%7C12712%7C2025-05-16T06%3A55%7C580%7C-%7C-%7C-&carriers=-32249&operators=-32249%2C-32249&passengers=1&channel=android&cabin_class=economy&fps_session_id=40ceb0db-2507-4c78-a5ed-ffffa2a89611&ticket_price=777.40&is_npt=false&is_multipart=false&client_id=skyscanner_app&request_id=e42ecc17-af18-478c-81c2-7bf75489cb44&q_ids=H4sIAAAAAAAA_-NS4GLJSCxPFGLmWJEsxcxxIV6h4UvLQTaNhrtTDrIZMSkwAgAc1rvBIgAAAA%7C-206899865700160777%7C2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2025-05-11T10%3A46%3A15&pqid=false&fare_type=base_fare&facilitated=false&requested_depth=BOOKING_PAGE&creative_id=CAM-68139e51-913d-4125-8e35-5d0b1a9314b6_*%2F*%2F*%2F*%2F*%2F*%2F*%2F*&redirect_delay=0",
                                            "showMoreInfo": false,
                                            "sponsoredText": "Sponsored",
                                            "subHeadline": "Say aloha to effortless travel.",
                                            "textColor": "#FFFFFF",
                                            "trackingId": "661638e8-e11d-49b5-b7c2-0ca9c425f11b",
                                            "trackingPixels": {
                                                "clickUrls": [
                                                    "/g/aps/public/api/v1/pixel/click?encryptedData=AT9CsWC2y8J29zi4%2BgEC7%2FPERA6%2B3Ccr%2F7kFGw03z%2BgLHuPP75VdOMcxkFSMtw2FeJuRbfHwL%2FffEA3LKBjO%2FIHdDpVI5owI0mrosPRrn1QOzhKzn6M1zcEeywtepbKdwsCoQeg4TXctk%2F0QE2aZ3w4WOLQtLQwZ8UxdKmMiFxWoJJCcRAhDNHkidbtN6ArIkKrWsTRcVFPqXVjDk5w11EJ89EsmVevf%2Buf1lBOqw2I0ZXH56f25I8yjk7%2FnKjzZZdnr3mJWiVrB4jiiNNSqM3vXZZ4Er0RGVXYUlPB5rIk%2B7L6NVvKhXOpsPPbJifk2sFlMUixJ4lJx1tAzwSOzhaJVFReFt1yWAcfF5ZN0SwnuhOCiccIjdeaN8Ab021C7Gd%2BvOoJC%2BWr%2BtY2lOG1ll%2BHkJcGjenaSQQ13iURg%2FQOrG0WJOKlBK2L08ifz%2FIqqlI%2BWzQXSSH9yk82bAqQclOiZvCqlbGuuIZIxVOWyyM1h1ZQIIg%2BFnENYqX%2FmK3Sy0sWdoSKfRtXCT0Jbg6%2Fb2zOcSEredssLU6jb235qW0zm8j8O7RBwuKNGpPVN%2BRxFkpsSYeZlQgBY4NreNC%2F8sboeGg59i6q4fzXD5bc41KRWKyAJQNHRHCa8PBZPOKtmoPiwFVIl%2B4sSYRbxyiSM5BNbLeOx3rdUz5Lp2GUGq4U4aiUBld9OQgCo8fFYcGKmI8EolmLBaDHGr6BgAWPJz5Y5U31v6%2Bl3dOGx"
                                                ],
                                                "engageUrls": [
                                                    "/g/aps/public/api/v1/pixel/engage?encryptedData=AbHuQYzecKp3joPCiRPf74fjbYGN8g67YNbEXN%2FbRyEpI1HyMmTrwmxcZSoL9aB%2BgEkSa4gF5NKs5sMu%2Fd%2FW9JXIxjhRhR4BZTHWFWo9K39cldMFHW%2FcCDGGsxOx33nq%2Bi5VT0OLlwLUATsygR18Sr33QVAt3aUgdfm1af0c9cdbin0FjAfODLnbKafiSP6xBgeIzQZ0IOYQKExAW%2FXdfwIImSkfA%2FDl4KJKJlMhxCTbfPvNKe38zV5rANwrIUOiwbQWsFscdby4vKnM5C2hWdiB%2FsPzio2c2GnWQBmw2U92E1PdW7RN6DCZv3o96gDwTG2TvD8ksvJRZX0XoWSUNF%2FcHtVHM2he0O5eBAalFh46XIRFnGd5gpSqgixwmWNPg6fX4ejI7fHcAgj2k84ggRRLOYal4fyw%2FW%2FBevWH5Mg9m4gTc3ZNy1GbZfBRsYk5QcR%2Bo3hW616%2FFYoReBp5Wt5d3LfeUA0IaE3VstMMrosD4yNgdat3hLnb%2B1bJOEdhUpYsNhcwJpDO7aYprBpm9DhxTD7Ox%2B8qzszdL1lZ5VRKWQECUZ9MWqWChlYLNmvWv2h0CBrXF0EcxYJ5uSfIbIgf5eQjVvL7WIKrddVuhw96wtsElrnrnA98JZTj8EJunlr8bRl9k%2Fy1%2FhzzHndh83wCFgj1awo4fBzl0SXVXNRPZA2d8Gvgtrca7JMHDcdZKuadIsJeuesnpr33ke1DTdknDjTGZWFOuMnRl%2Fh8nCA%2Fz232G0BBoxLfeNwrfGV0jITWOc4fFn%2FkziF%2FJkq94%2BOKz%2Fm3QwXT0PLN%2BskRRqaBGs8yKYmxda2o0yLcwNFnsu%2FwFKDtkL1AYUAoIvVl0fSN"
                                                ],
                                                "impressionUrls": [
                                                    "/g/aps/public/api/v1/pixel/impression?encryptedData=AeVpxR2AqJDrZzm%2BR89snswN1T%2BIroO6vN%2FKSElttY83iz1evaXCmo9Pbpt61QRkmdg3USlEssyAgjwjeKx0i0A41rXCXvvqg0oOtOhrd%2BT%2BN5pkeOICBIOPlySYXL0Wfn8Le5SHyegyjt7GwJQTfpXYlbcBUeGb6kyZkI%2BJ%2Fd1Ru%2Fn2vD%2FtodJbgEu4xbnjCLY90e3cGkCuTZBAbUMKAad5DT4HkB4DRSc539nATtXgfbY%2BdHImlc2sT36a0Dl3C0NsCGdtd8ZpYNmaJ3LFBsqHgTblkgvK7nqImW43VD8yolILsbopeqauaw0fSseZ9MsXok6q77Kk4jGCZia%2FKoAliEAkC630%2BrSo4L1J%2FIPlorRKAANIZQLjZJ9vsil5QrXQmt4G3VkVIFOQIvP00A42p01WGNkLBduuat3fXmnf1vQmYadggY0TrJ3VEVV7Vrj75B9c8Ra2ysn28n2WSdG8n0kr5yd5D0FGdhAwcmhdFLwH2jGrfegwcdqkhuxVPtnAj6hbcRRu5IGVNWlj%2B6Em9e21dg9E6O31Xt76u%2Fxcd5gF4Sa70EBIoQrr2ZtjIB6bPNLeiJUNIZTJThZUzGm0N6NB842C1cvoDCjOC5O5NfABD4pZxNglJGal0qqcLfWGgkB1YCPxLenXrYDLujBhxZirEob8XcWPXo5rljO3xhyMdA%3D%3D"
                                                ],
                                                "viewUrls": [
                                                    "/g/aps/public/api/v1/pixel/view?encryptedData=AS%2Bi2IFC51sJdXezzDxF64QpybLkkk2ZC4FkYMMxN16ZnzVTKZr0G7XO1lITPjamb96EbnjibwpCGcGF%2BdWl%2FiERtefCyhteWvkCHx8SjcguqFgnc8s%2Bwki%2FbbxJA2KcygqXgnWBYfyYwlmY4AJ0RJr2Jktbeh9XaTfGI2u4XOUbzycX7%2B9qep2znWUhms%2Fr63SMmlCdPvZuzdv1mhInHeJ86mDI8xG7B5%2FnMSHvDvGXwAouDvzkqNWkIETAtifSsKWlS0lw7MhkpzJ9SN4wuaQK7EPKQACdPbGq10oyYSUqlKwWQq%2B6RpK%2BAAe7GTUdWw3KnoTtsx3RHI8Rob3ijg%2BuCiLw8Mak%2BYr3WQZfGRnWnaYcW8Qx2TgsVq%2BWQf9yUpx002ar67Mv8u0kcZ1%2BKIYdc1%2Bkxf9qryj0ZYg8%2FY8APjnRzls%2BXuQ2UzE59oSMAGKFG399o%2F%2Bgm8ESUkfPAJcFvNwptFzoZOkdnyTO3t%2F8H6wO1aFFCZE7g5%2FTUudLlas0pSDpDUsW%2BDAkDhOqH07q%2FNEXl%2BD60V3Ku7g%2B2Cw5DxnU%2B7l4%2Bm5f6B342tWINZMGd7eb37ceHM3vNoaH7XYhwxG6cQX1o495vmCYsWkTFdf0MGusQwyiBeBdazjgIixzgpxD4YMX8%2Fx70M2ZiwerU2F%2Bq9hGCkZc0gL%2FHO3V5lagUelhcHm1tjLIHuuu02eqx%2B%2FAXvbxH%2FY0kkImcyxituhjhLtV99Npw2JeZKOqX6Bopj1k%2BHEbhPWD7mhAOZNcg%2Bog5cZeiAIlerSmswrtyQ%2FzlPlfUpVeDOknQiUJQdkRGETDypzeYuFnGHWe0znkE4WvjWueCdTqyw1FZ%2Bf7"
                                                ]
                                            }
                                        }
                                    ],
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
                                    "score": 0.9999846,
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
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
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
                                        "formatted": "$892",
                                        "pricingOptionId": "Rd2sShlNLgby",
                                        "raw": 891.97
                                    },
                                    "score": 0.99996513,
                                    "tags": [
                                        "third_shortest"
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
                                    "score": 0.9999586
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
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
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
                                        "formatted": "$1,059",
                                        "pricingOptionId": "if5s-VDjev8a",
                                        "raw": 1058.03
                                    },
                                    "score": 0.9999369
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
                                    "score": 0.9894277
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
                                    "score": 0.9620429
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
                                    "score": 0.95929873
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
                                    "adInfos": [
                                        {
                                            "appIndexList": [
                                                0
                                            ],
                                            "backgroundColor": "#4A2C88",
                                            "bannerImageUrl": null,
                                            "creativeId": "CAM-68139e51-913d-4125-8e35-5d0b1a9314b6",
                                            "format": "flightsItineraryInlinePlus",
                                            "formatId": "fmt.flightsItineraryInlinePlus",
                                            "headline": "Book confidently, fly safely.",
                                            "index": 0,
                                            "isDbook": null,
                                            "isOrganic": true,
                                            "message": null,
                                            "moreInfoLabel": null,
                                            "moreInfoTarget": null,
                                            "partner": "hawa",
                                            "partnerId": "hawa",
                                            "partnerLogoUrl": "https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2F79e8500eac7762307486e191a2c96f40.png?publicName=HAL_r_Wordmark_Logo_w.png",
                                            "partnerName": "Hawaiian Airlines",
                                            "partnerType": "airline",
                                            "placementId": "android.flights.combinedresults/inline",
                                            "price": {
                                                "formatted": "$778",
                                                "pricingOptionId": "avB2mQSR1q4N",
                                                "raw": 777.4
                                            },
                                            "redirectCityUrl": null,
                                            "redirectPageType": null,
                                            "redirectPlaceCode": null,
                                            "redirectUrl": "https://skyscanner.net/transport_deeplink/4.0/US/en-US/USD/hawa/2/12712.12240.2025-05-12,12240.12712.2025-05-15/air/airli/inlineads?itinerary=flight%7C-32249%7C51%7C12712%7C2025-05-12T09%3A05%7C12240%7C2025-05-12T13%3A55%7C650%7C-%7C-%7C-%2Cflight%7C-32249%7C50%7C12240%7C2025-05-15T15%3A15%7C12712%7C2025-05-16T06%3A55%7C580%7C-%7C-%7C-&carriers=-32249&operators=-32249%2C-32249&passengers=1&channel=android&cabin_class=economy&fps_session_id=40ceb0db-2507-4c78-a5ed-ffffa2a89611&ticket_price=777.40&is_npt=false&is_multipart=false&client_id=skyscanner_app&request_id=e42ecc17-af18-478c-81c2-7bf75489cb44&q_ids=H4sIAAAAAAAA_-NS4GLJSCxPFGLmWJEsxcxxIV6h4UvLQTaNhrtTDrIZMSkwAgAc1rvBIgAAAA%7C-206899865700160777%7C2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2025-05-11T10%3A46%3A15&pqid=false&fare_type=base_fare&facilitated=false&requested_depth=BOOKING_PAGE&creative_id=CAM-68139e51-913d-4125-8e35-5d0b1a9314b6_*%2F*%2F*%2F*%2F*%2F*%2F*%2F*&redirect_delay=0",
                                            "showMoreInfo": false,
                                            "sponsoredText": "Sponsored",
                                            "subHeadline": "Say aloha to effortless travel.",
                                            "textColor": "#FFFFFF",
                                            "trackingId": "661638e8-e11d-49b5-b7c2-0ca9c425f11b",
                                            "trackingPixels": {
                                                "clickUrls": [
                                                    "/g/aps/public/api/v1/pixel/click?encryptedData=AT9CsWC2y8J29zi4%2BgEC7%2FPERA6%2B3Ccr%2F7kFGw03z%2BgLHuPP75VdOMcxkFSMtw2FeJuRbfHwL%2FffEA3LKBjO%2FIHdDpVI5owI0mrosPRrn1QOzhKzn6M1zcEeywtepbKdwsCoQeg4TXctk%2F0QE2aZ3w4WOLQtLQwZ8UxdKmMiFxWoJJCcRAhDNHkidbtN6ArIkKrWsTRcVFPqXVjDk5w11EJ89EsmVevf%2Buf1lBOqw2I0ZXH56f25I8yjk7%2FnKjzZZdnr3mJWiVrB4jiiNNSqM3vXZZ4Er0RGVXYUlPB5rIk%2B7L6NVvKhXOpsPPbJifk2sFlMUixJ4lJx1tAzwSOzhaJVFReFt1yWAcfF5ZN0SwnuhOCiccIjdeaN8Ab021C7Gd%2BvOoJC%2BWr%2BtY2lOG1ll%2BHkJcGjenaSQQ13iURg%2FQOrG0WJOKlBK2L08ifz%2FIqqlI%2BWzQXSSH9yk82bAqQclOiZvCqlbGuuIZIxVOWyyM1h1ZQIIg%2BFnENYqX%2FmK3Sy0sWdoSKfRtXCT0Jbg6%2Fb2zOcSEredssLU6jb235qW0zm8j8O7RBwuKNGpPVN%2BRxFkpsSYeZlQgBY4NreNC%2F8sboeGg59i6q4fzXD5bc41KRWKyAJQNHRHCa8PBZPOKtmoPiwFVIl%2B4sSYRbxyiSM5BNbLeOx3rdUz5Lp2GUGq4U4aiUBld9OQgCo8fFYcGKmI8EolmLBaDHGr6BgAWPJz5Y5U31v6%2Bl3dOGx"
                                                ],
                                                "engageUrls": [
                                                    "/g/aps/public/api/v1/pixel/engage?encryptedData=AbHuQYzecKp3joPCiRPf74fjbYGN8g67YNbEXN%2FbRyEpI1HyMmTrwmxcZSoL9aB%2BgEkSa4gF5NKs5sMu%2Fd%2FW9JXIxjhRhR4BZTHWFWo9K39cldMFHW%2FcCDGGsxOx33nq%2Bi5VT0OLlwLUATsygR18Sr33QVAt3aUgdfm1af0c9cdbin0FjAfODLnbKafiSP6xBgeIzQZ0IOYQKExAW%2FXdfwIImSkfA%2FDl4KJKJlMhxCTbfPvNKe38zV5rANwrIUOiwbQWsFscdby4vKnM5C2hWdiB%2FsPzio2c2GnWQBmw2U92E1PdW7RN6DCZv3o96gDwTG2TvD8ksvJRZX0XoWSUNF%2FcHtVHM2he0O5eBAalFh46XIRFnGd5gpSqgixwmWNPg6fX4ejI7fHcAgj2k84ggRRLOYal4fyw%2FW%2FBevWH5Mg9m4gTc3ZNy1GbZfBRsYk5QcR%2Bo3hW616%2FFYoReBp5Wt5d3LfeUA0IaE3VstMMrosD4yNgdat3hLnb%2B1bJOEdhUpYsNhcwJpDO7aYprBpm9DhxTD7Ox%2B8qzszdL1lZ5VRKWQECUZ9MWqWChlYLNmvWv2h0CBrXF0EcxYJ5uSfIbIgf5eQjVvL7WIKrddVuhw96wtsElrnrnA98JZTj8EJunlr8bRl9k%2Fy1%2FhzzHndh83wCFgj1awo4fBzl0SXVXNRPZA2d8Gvgtrca7JMHDcdZKuadIsJeuesnpr33ke1DTdknDjTGZWFOuMnRl%2Fh8nCA%2Fz232G0BBoxLfeNwrfGV0jITWOc4fFn%2FkziF%2FJkq94%2BOKz%2Fm3QwXT0PLN%2BskRRqaBGs8yKYmxda2o0yLcwNFnsu%2FwFKDtkL1AYUAoIvVl0fSN"
                                                ],
                                                "impressionUrls": [
                                                    "/g/aps/public/api/v1/pixel/impression?encryptedData=AeVpxR2AqJDrZzm%2BR89snswN1T%2BIroO6vN%2FKSElttY83iz1evaXCmo9Pbpt61QRkmdg3USlEssyAgjwjeKx0i0A41rXCXvvqg0oOtOhrd%2BT%2BN5pkeOICBIOPlySYXL0Wfn8Le5SHyegyjt7GwJQTfpXYlbcBUeGb6kyZkI%2BJ%2Fd1Ru%2Fn2vD%2FtodJbgEu4xbnjCLY90e3cGkCuTZBAbUMKAad5DT4HkB4DRSc539nATtXgfbY%2BdHImlc2sT36a0Dl3C0NsCGdtd8ZpYNmaJ3LFBsqHgTblkgvK7nqImW43VD8yolILsbopeqauaw0fSseZ9MsXok6q77Kk4jGCZia%2FKoAliEAkC630%2BrSo4L1J%2FIPlorRKAANIZQLjZJ9vsil5QrXQmt4G3VkVIFOQIvP00A42p01WGNkLBduuat3fXmnf1vQmYadggY0TrJ3VEVV7Vrj75B9c8Ra2ysn28n2WSdG8n0kr5yd5D0FGdhAwcmhdFLwH2jGrfegwcdqkhuxVPtnAj6hbcRRu5IGVNWlj%2B6Em9e21dg9E6O31Xt76u%2Fxcd5gF4Sa70EBIoQrr2ZtjIB6bPNLeiJUNIZTJThZUzGm0N6NB842C1cvoDCjOC5O5NfABD4pZxNglJGal0qqcLfWGgkB1YCPxLenXrYDLujBhxZirEob8XcWPXo5rljO3xhyMdA%3D%3D"
                                                ],
                                                "viewUrls": [
                                                    "/g/aps/public/api/v1/pixel/view?encryptedData=AS%2Bi2IFC51sJdXezzDxF64QpybLkkk2ZC4FkYMMxN16ZnzVTKZr0G7XO1lITPjamb96EbnjibwpCGcGF%2BdWl%2FiERtefCyhteWvkCHx8SjcguqFgnc8s%2Bwki%2FbbxJA2KcygqXgnWBYfyYwlmY4AJ0RJr2Jktbeh9XaTfGI2u4XOUbzycX7%2B9qep2znWUhms%2Fr63SMmlCdPvZuzdv1mhInHeJ86mDI8xG7B5%2FnMSHvDvGXwAouDvzkqNWkIETAtifSsKWlS0lw7MhkpzJ9SN4wuaQK7EPKQACdPbGq10oyYSUqlKwWQq%2B6RpK%2BAAe7GTUdWw3KnoTtsx3RHI8Rob3ijg%2BuCiLw8Mak%2BYr3WQZfGRnWnaYcW8Qx2TgsVq%2BWQf9yUpx002ar67Mv8u0kcZ1%2BKIYdc1%2Bkxf9qryj0ZYg8%2FY8APjnRzls%2BXuQ2UzE59oSMAGKFG399o%2F%2Bgm8ESUkfPAJcFvNwptFzoZOkdnyTO3t%2F8H6wO1aFFCZE7g5%2FTUudLlas0pSDpDUsW%2BDAkDhOqH07q%2FNEXl%2BD60V3Ku7g%2B2Cw5DxnU%2B7l4%2Bm5f6B342tWINZMGd7eb37ceHM3vNoaH7XYhwxG6cQX1o495vmCYsWkTFdf0MGusQwyiBeBdazjgIixzgpxD4YMX8%2Fx70M2ZiwerU2F%2Bq9hGCkZc0gL%2FHO3V5lagUelhcHm1tjLIHuuu02eqx%2B%2FAXvbxH%2FY0kkImcyxituhjhLtV99Npw2JeZKOqX6Bopj1k%2BHEbhPWD7mhAOZNcg%2Bog5cZeiAIlerSmswrtyQ%2FzlPlfUpVeDOknQiUJQdkRGETDypzeYuFnGHWe0znkE4WvjWueCdTqyw1FZ%2Bf7"
                                                ]
                                            }
                                        }
                                    ],
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
                                    "score": 0.767955
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
                                    "id": "12712-2505120905--32593-0-12240-2505121355|12240-2505151515--32249-0-12712-2505160655",
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
                                        "formatted": "$892",
                                        "pricingOptionId": "Rd2sShlNLgby",
                                        "raw": 891.97
                                    },
                                    "score": 0.734042,
                                    "tags": [
                                        "third_shortest"
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
                                    "id": "12712-2505120905--32249-0-12240-2505121355|12240-2505151515--32593-0-12712-2505160655",
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
                                        "formatted": "$1,059",
                                        "pricingOptionId": "if5s-VDjev8a",
                                        "raw": 1058.03
                                    },
                                    "score": 0.648084
                                }
                            ],
                            "name": "Direct"
                        }
                    ],
                    "context": {
                        "sessionId": "40ceb0db-2507-4c78-a5ed-ffffa2a89611",
                        "status": "complete",
                        "totalResults": 1034
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
                                        "entityId": "95565057",
                                        "id": "LGA",
                                        "name": "New York LaGuardia"
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
                                "minPrice": "$748",
                                "name": "Alaska Airlines"
                            },
                            {
                                "alternateId": "AA",
                                "id": -32573,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
                                "minPrice": "$687",
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
                            },
                            {
                                "alternateId": "WN",
                                "id": -31829,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/WN.png",
                                "minPrice": "$757",
                                "name": "Southwest Airlines"
                            },
                            {
                                "alternateId": "UA",
                                "id": -31722,
                                "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                "minPrice": "$765",
                                "name": "United"
                            }
                        ],
                        "duration": {
                            "max": 2156,
                            "min": 650,
                            "multiCityMax": 3785,
                            "multiCityMin": 1230
                        },
                        "hasCityOpenJaw": true,
                        "multipleCarriers": {
                            "minPrice": "$892",
                            "rawMinPrice": null
                        },
                        "stopPrices": {
                            "direct": {
                                "formattedPrice": "$750",
                                "isPresent": true,
                                "rawPrice": 750.0
                            },
                            "one": {
                                "formattedPrice": "$687",
                                "isPresent": true,
                                "rawPrice": 687.0
                            },
                            "twoOrMore": {
                                "formattedPrice": "$757",
                                "isPresent": true,
                                "rawPrice": 757.0
                            }
                        },
                        "total": 1034
                    },
                    "results": []
                },
                "packages": {
                    "buckets": null,
                    "context": {
                        "sessionId": "40ceb0db-2507-4c78-a5ed-ffffa2a89611",
                        "status": "complete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "status": "success",
                "token": "eyJjYyI6ICJlY29ub215IiwgImEiOiAxLCAiYyI6IDAsICJpIjogMCwgImwiOiBbWyJOWUNBIiwgIkhOTCIsICIyMDI1LTA1LTEyIl0sIFsiSE5MIiwgIk5ZQ0EiLCAiMjAyNS0wNS0xNSJdXX0="
            },

        }
    }

    async getFlightDestinations(): Promise<FlightDestination[]> {
        // TODO: Uncomment this when access to RapidAPI is granted
        // const options = {
        //     method: 'GET',
        //     url: 'https://skyscanner89.p.rapidapi.com/flights/auto-complete',
        //     params: { query: 'New' },
        //     headers: {
        //         'x-rapidapi-host': 'skyscanner89.p.rapidapi.com'
        //     }
        // };

        try {
            // TODO: Uncomment this when access to RapidAPI is granted
            // const response = await axios.request(options);

            const response = FlightApiService.getMockGetFlightDestinations();

            const flightDestinations: FlightDestination[] = [];

            for (const inputSuggest of response.data.inputSuggest) {
                const flightDestinationData: FlightDestinationProps = {
                    locationId: inputSuggest.navigation.relevantFlightParams.entityId,
                    locationName: inputSuggest.navigation.relevantFlightParams.localizedName,
                    locationCode: inputSuggest.navigation.relevantFlightParams.skyId,
                };

                flightDestinations.push(new FlightDestination(flightDestinationData));
            }

            return flightDestinations;
        } catch (error) {
            throw new Error(`Failed to search flights: ${error.message}`);
        }
    }

    static getMockGetFlightDestinations(): GetFlightDestinationsResponse {
        return {
            data: {
                "inputSuggest": [
                    {
                        "navigation": {
                            "entityId": "27537542",
                            "entityType": "CITY",
                            "localizedName": "New York",
                            "relevantFlightParams": {
                                "entityId": "27537542",
                                "flightPlaceType": "CITY",
                                "localizedName": "New York",
                                "skyId": "NYCA"
                            },
                            "relevantHotelParams": {
                                "entityId": "27537542",
                                "entityType": "CITY",
                                "localizedName": "New York"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "New York (Any)",
                            "title": "New York"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95565059",
                            "entityType": "AIRPORT",
                            "localizedName": "New York Newark",
                            "relevantFlightParams": {
                                "entityId": "95565059",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "New York Newark",
                                "skyId": "EWR"
                            },
                            "relevantHotelParams": {
                                "entityId": "27537542",
                                "entityType": "CITY",
                                "localizedName": "New York"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "New York Newark (EWR)",
                            "title": "New York Newark"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95565058",
                            "entityType": "AIRPORT",
                            "localizedName": "New York John F. Kennedy",
                            "relevantFlightParams": {
                                "entityId": "95565058",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "New York John F. Kennedy",
                                "skyId": "JFK"
                            },
                            "relevantHotelParams": {
                                "entityId": "27537542",
                                "entityType": "CITY",
                                "localizedName": "New York"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "New York John F. Kennedy (JFK)",
                            "title": "New York John F. Kennedy"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95565057",
                            "entityType": "AIRPORT",
                            "localizedName": "New York LaGuardia",
                            "relevantFlightParams": {
                                "entityId": "95565057",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "New York LaGuardia",
                                "skyId": "LGA"
                            },
                            "relevantHotelParams": {
                                "entityId": "27537542",
                                "entityType": "CITY",
                                "localizedName": "New York"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "New York LaGuardia (LGA)",
                            "title": "New York LaGuardia"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95566280",
                            "entityType": "AIRPORT",
                            "localizedName": "Stewart International",
                            "relevantFlightParams": {
                                "entityId": "95566280",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "Stewart International",
                                "skyId": "SWF"
                            },
                            "relevantHotelParams": {
                                "entityId": "27537542",
                                "entityType": "CITY",
                                "localizedName": "New York"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "Stewart International (SWF)",
                            "title": "Stewart International"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95674044",
                            "entityType": "AIRPORT",
                            "localizedName": "Newcastle",
                            "relevantFlightParams": {
                                "entityId": "95674044",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "Newcastle",
                                "skyId": "NCL"
                            },
                            "relevantHotelParams": {
                                "entityId": "27545092",
                                "entityType": "CITY",
                                "localizedName": "Newcastle"
                            }
                        },
                        "presentation": {
                            "subtitle": "United Kingdom",
                            "suggestionTitle": "Newcastle (NCL)",
                            "title": "Newcastle"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "95673963",
                            "entityType": "AIRPORT",
                            "localizedName": "Newquay",
                            "relevantFlightParams": {
                                "entityId": "95673963",
                                "flightPlaceType": "AIRPORT",
                                "localizedName": "Newquay",
                                "skyId": "NQY"
                            },
                            "relevantHotelParams": {
                                "entityId": "27545149",
                                "entityType": "CITY",
                                "localizedName": "Newquay"
                            }
                        },
                        "presentation": {
                            "subtitle": "United Kingdom",
                            "suggestionTitle": "Newquay (NQY)",
                            "title": "Newquay"
                        }
                    },
                    {
                        "navigation": {
                            "entityId": "35234892",
                            "entityType": "CITY",
                            "localizedName": "New Orleans",
                            "relevantFlightParams": {
                                "entityId": "35234892",
                                "flightPlaceType": "CITY",
                                "localizedName": "New Orleans",
                                "skyId": "MSYA"
                            },
                            "relevantHotelParams": {
                                "entityId": "35234892",
                                "entityType": "CITY",
                                "localizedName": "New Orleans"
                            }
                        },
                        "presentation": {
                            "subtitle": "United States",
                            "suggestionTitle": "New Orleans (Any)",
                            "title": "New Orleans"
                        }
                    }
                ]
            }
        }
    }
}
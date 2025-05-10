import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { Flight, FlightProps } from '@flight/domain/entities/flight';
import { IFlightDataService, FlightSearchParams } from '@flight/application/interfaces/flight-data-service';

export interface SearchFlightResponse {
    data: {
        accommodations: Accommodation;
        brandCarousel: BrandCarousel;
        brandInlines: BrandInlines;
        carHire: CarHire;
        context: ContextWithoutTotalResults;
        itineraries: Itineraries;
        packages: Packages;
        token: string;
    }
}

// Accomodation

interface Accommodation {
    buckets: AccommodationBucket[];
    context: ContextWithTotalResults;
    results: string[]; // Assume this is an array of strings
}

interface AccommodationBucket {
    id: string;
    items: AccommodationItem[];
    name: string;
}

interface AccommodationItem {
    deeplink: string;
    distance: string;
    id: string;
    imageUrl: string;
    name: string;
    nightsForPrice: string;
    partner: AccomodationPartner;
    price: string;
    pricesFrom: string;
    rating: AccommodationRating;
    rawPrice: number;
    rawPricesFrom: number;
    stars: number;
}

interface AccomodationPartner {
    isDbook: boolean;
    logo: string;
    name: string;
    type: string;
    websiteId: string;
}

interface AccommodationRating {
    count: number;
    description: string;
    fivePointsValue: number;
    imageUrl?: string;
    value: number;
}

// Brand Carousel

interface BrandCarousel {
    buckets: null;
    context: ContextWithTotalResults;
    results: string[]; // Assume this is an array of strings
}

// Brand Inlines

interface BrandInlines {
    buckets: null;
    context: ContextWithTotalResults;
    results: string[]; // Assume this is an array of strings
}

// Car Hire

interface CarHire {
    buckets: CarHireBucket[];
    context: ContextWithTotalResults;
    results: string[]; // Assume this is an array of strings
}

interface CarHireBucket {
    id: string;
    items: CarHireItem[];
    name: string;
}

interface CarHireItem {
    bags: number;
    carClass: string;
    doors: string;
    filterPill: CarHireItemsFilterPill;
    formattedCarClass: string;
    formattedDoors: string;
    formattedPrice: string;
    formattedTotalPrice: string;
    groupKey: string;
    groupType: string;
    image: string;
    price: CarHireItemPrice;
    redirectUrl: string;
    seats: number;
}

interface CarHireItemsFilterPill {
    composition: CarHireItemsFilterPillComposition;
    displayName: CarHireItemsFilterPillDisplayName;
    filterPillScore: number;
    logicalName: string;
}

interface CarHireItemsFilterPillComposition {
    sortOrderId: string;
}

interface CarHireItemsFilterPillDisplayName {
    displayName: string;
    isLocalised: boolean;
}

interface CarHireItemPrice {
    amount: string;
    currencyCode: string;
    unit: string;
}

// Itineraries

interface Itineraries {
    agents: null;
    alliances: null;
    buckets: ItinerariesBucket[];
    context: ContextWithTotalResults;
    creatives: null;
    destinationImageUrl: string;
    filterStats: null;
    results: string[]; // Assume this is an array of strings
}

interface ItinerariesBucket {
    id: string;
    items: Object[];
    name: string;
}

// Packages

interface Packages {
    buckets: null;
    context: ContextWithTotalResults;
    results: string[]; // Assume this is an array of strings
}

// Common

interface ContextWithTotalResults {
    sessionId: string;
    status: string;
    totalResults: number;
}

interface ContextWithoutTotalResults {
    sessionId: string;
    status: string;
}

@Injectable()
export class FlightApiService implements IFlightDataService {
    async searchFlight(params: FlightSearchParams): Promise<Flight> {
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

            const flightData: FlightProps = {
                accommodations: response.data.accommodations,
                brandCarousel: response.data.brandCarousel,
                brandInlines: response.data.brandInlines,
                carHire: response.data.carHire,
                context: response.data.context,
                itineraries: response.data.itineraries,
                packages: response.data.packages,
                token: response.data.token,
            };

            return new Flight(flightData);
        } catch (error) {
            throw new Error(`Failed to search flights: ${error.message}`);
        }
    }

    static getMockFlight(): SearchFlightResponse {
        return {
            data: {
                accommodations: {
                    buckets: [
                        {
                            "id": "common_best_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46944979&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTQwLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk0NDk3OSJ9",
                                    "distance": "4.09 miles from Honolulu International",
                                    "id": "46944979",
                                    "imageUrl": "https://content.skyscnr.com/available/1647188458/1647188458_WxH.jpg",
                                    "name": "Aston at the Executive Centre Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_11.png",
                                        "name": "SuperTravel",
                                        "type": "OTA",
                                        "websiteId": "h_11"
                                    },
                                    "price": "$140",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 526,
                                        "description": "Very Good",
                                        "fivePointsValue": 4,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-64600-4.png",
                                        "value": 8
                                    },
                                    "rawPrice": 140,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46992136&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTg5LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk5MjEzNiJ9",
                                    "distance": "6.02 miles from Honolulu International",
                                    "id": "46992136",
                                    "imageUrl": "https://content.skyscnr.com/available/1395140750/1395140750_WxH.jpg",
                                    "name": "Hilton Vacation Club The Modern Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_m3.png",
                                        "name": "Morerooms",
                                        "type": "OTA",
                                        "websiteId": "h_m3"
                                    },
                                    "price": "$189",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 5073,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 189,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=187718124&rooms=1&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTE1LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIxODc3MTgxMjQifQ%3D%3D",
                                    "distance": "5.96 miles from Honolulu International",
                                    "id": "187718124",
                                    "imageUrl": "https://content.skyscnr.com/available/1639083748/1639083748_WxH.jpg",
                                    "name": "The Equus",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$115",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 2214,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 115,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                }
                            ],
                            "name": "Best"
                        },
                        {
                            "id": "cr_4star_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=218442576&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MzI1LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIyMTg0NDI1NzYifQ%3D%3D",
                                    "distance": "5.48 miles from Honolulu International",
                                    "id": "218442576",
                                    "imageUrl": "https://content.skyscnr.com/available/1579329496/1579329496_WxH.jpg",
                                    "name": "Renaissance Residences Oahu Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ct.png",
                                        "name": "Trip.com",
                                        "type": "OTA",
                                        "websiteId": "h_ct"
                                    },
                                    "price": "$325",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 7,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.800000190734863,
                                        "value": 9.600000381469727
                                    },
                                    "rawPrice": 325,
                                    "rawPricesFrom": 1,
                                    "stars": 5
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=219419579&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTMzLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIyMTk0MTk1NzkifQ%3D%3D",
                                    "distance": "5.82 miles from Honolulu International",
                                    "id": "219419579",
                                    "imageUrl": "https://content.skyscnr.com/available/1562981794/1562981794_WxH.jpg",
                                    "name": "Ocean View Room at a Resort",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$133",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 0,
                                        "description": "No rating",
                                        "fivePointsValue": 0,
                                        "value": 0
                                    },
                                    "rawPrice": 133,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=216932002&rooms=1&filters=%7B%22stars%22%3A%225%2C4%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MjQ2LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIyMTY5MzIwMDIifQ%3D%3D",
                                    "distance": "5.46 miles from Honolulu International",
                                    "id": "216932002",
                                    "imageUrl": "https://content.skyscnr.com/available/1579249029/1579249029_WxH.jpg",
                                    "name": "Renaissance Honolulu Hotel & Spa",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ct.png",
                                        "name": "Trip.com",
                                        "type": "OTA",
                                        "websiteId": "h_ct"
                                    },
                                    "price": "$246",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 5,
                                        "description": "Good",
                                        "fivePointsValue": 3.5999999046325684,
                                        "value": 7.199999809265137
                                    },
                                    "rawPrice": 246,
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
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=187718124&rooms=1&filters=%7B%22stars%22%3A%224%2C5%2C3%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTE1LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIxODc3MTgxMjQifQ%3D%3D",
                                    "distance": "5.96 miles from Honolulu International",
                                    "id": "187718124",
                                    "imageUrl": "https://content.skyscnr.com/available/1639083748/1639083748_WxH.jpg",
                                    "name": "The Equus",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$115",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 2214,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 115,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=140062389&rooms=1&filters=%7B%22stars%22%3A%224%2C5%2C3%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTE3LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIxNDAwNjIzODkifQ%3D%3D",
                                    "distance": "5.83 miles from Honolulu International",
                                    "id": "140062389",
                                    "imageUrl": "https://content.skyscnr.com/available/1557740338/1557740338_WxH.jpg",
                                    "name": "Castle at Ala Moana Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$117",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 8,
                                        "description": "Below Average",
                                        "fivePointsValue": 2.299999952316284,
                                        "value": 4.599999904632568
                                    },
                                    "rawPrice": 117,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=219419579&rooms=1&filters=%7B%22stars%22%3A%224%2C5%2C3%22%2C%22property_type%22%3A%22Hotel%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTMzLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIyMTk0MTk1NzkifQ%3D%3D",
                                    "distance": "5.82 miles from Honolulu International",
                                    "id": "219419579",
                                    "imageUrl": "https://content.skyscnr.com/available/1562981794/1562981794_WxH.jpg",
                                    "name": "Ocean View Room at a Resort",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$133",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 0,
                                        "description": "No rating",
                                        "fivePointsValue": 0,
                                        "value": 0
                                    },
                                    "rawPrice": 133,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                }
                            ],
                            "name": "Cheapest"
                        },
                        {
                            "id": "cr_excellent_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46943929&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTc1LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk0MzkyOSJ9",
                                    "distance": "6.07 miles from Honolulu International",
                                    "id": "46943929",
                                    "imageUrl": "https://content.skyscnr.com/available/1077166713/1077166713_WxH.jpg",
                                    "name": "Ilikai Hotel & Luxury Suites",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$175",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 2876,
                                        "description": "Very Good",
                                        "fivePointsValue": 4,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-64600-4.png",
                                        "value": 8
                                    },
                                    "rawPrice": 175,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=216897446&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MjQxLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIyMTY4OTc0NDYifQ%3D%3D",
                                    "distance": "4.13 miles from Honolulu International",
                                    "id": "216897446",
                                    "imageUrl": "https://content.skyscnr.com/available/1638733184/1638733184_WxH.jpg",
                                    "name": "AC Hotel Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_tc.png",
                                        "name": "Travelocity",
                                        "type": "OTA",
                                        "websiteId": "h_tc"
                                    },
                                    "price": "$241",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 1,
                                        "description": "Outstanding",
                                        "fivePointsValue": 5,
                                        "value": 10
                                    },
                                    "rawPrice": 241,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46992136&rooms=1&filters=%7B%22rating%22%3A%224%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTg5LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk5MjEzNiJ9",
                                    "distance": "6.02 miles from Honolulu International",
                                    "id": "46992136",
                                    "imageUrl": "https://content.skyscnr.com/available/1395140750/1395140750_WxH.jpg",
                                    "name": "Hilton Vacation Club The Modern Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_m3.png",
                                        "name": "Morerooms",
                                        "type": "OTA",
                                        "websiteId": "h_m3"
                                    },
                                    "price": "$189",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 5073,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 189,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                }
                            ],
                            "name": "Excellent reviews"
                        },
                        {
                            "id": "cr_free_breakfast_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=47007680&rooms=1&filters=%7B%22meal_plan%22%3A%22breakfast_included%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTcwLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0NzAwNzY4MCJ9",
                                    "distance": "0.90 miles from Honolulu International",
                                    "id": "47007680",
                                    "imageUrl": "https://content.skyscnr.com/available/1395482478/1395482478_WxH.jpg",
                                    "name": "Best Western the Plaza Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_m3.png",
                                        "name": "Morerooms",
                                        "type": "OTA",
                                        "websiteId": "h_m3"
                                    },
                                    "price": "$170",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 1969,
                                        "description": "Good",
                                        "fivePointsValue": 3.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-64600-4.png",
                                        "value": 7
                                    },
                                    "rawPrice": 170,
                                    "rawPricesFrom": 1,
                                    "stars": 2
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46992136&rooms=1&filters=%7B%22meal_plan%22%3A%22breakfast_included%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTg5LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk5MjEzNiJ9",
                                    "distance": "6.02 miles from Honolulu International",
                                    "id": "46992136",
                                    "imageUrl": "https://content.skyscnr.com/available/1395140750/1395140750_WxH.jpg",
                                    "name": "Hilton Vacation Club The Modern Honolulu",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_m3.png",
                                        "name": "Morerooms",
                                        "type": "OTA",
                                        "websiteId": "h_m3"
                                    },
                                    "price": "$189",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 5073,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 189,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                }
                            ],
                            "name": "Breakfast included"
                        },
                        {
                            "id": "cr_free_cancellation_v1",
                            "items": [
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46944979&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTc1LjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk0NDk3OSJ9",
                                    "distance": "4.09 miles from Honolulu International",
                                    "id": "46944979",
                                    "imageUrl": "https://content.skyscnr.com/available/1647188458/1647188458_WxH.jpg",
                                    "name": "Aston at the Executive Centre Hotel",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_tt.png",
                                        "name": "Algotels",
                                        "type": "OTA",
                                        "websiteId": "h_tt"
                                    },
                                    "price": "$175",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 526,
                                        "description": "Very Good",
                                        "fivePointsValue": 4,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-64600-4.png",
                                        "value": 8
                                    },
                                    "rawPrice": 175,
                                    "rawPricesFrom": 1,
                                    "stars": 3
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=46943220&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MjQzLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiI0Njk0MzIyMCJ9",
                                    "distance": "5.92 miles from Honolulu International",
                                    "id": "46943220",
                                    "imageUrl": "https://content.skyscnr.com/available/1647247130/1647247130_WxH.jpg",
                                    "name": "Prince Waikiki",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_tt.png",
                                        "name": "Algotels",
                                        "type": "OTA",
                                        "websiteId": "h_tt"
                                    },
                                    "price": "$243",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 3775,
                                        "description": "Excellent",
                                        "fivePointsValue": 4.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.png",
                                        "value": 9
                                    },
                                    "rawPrice": 243,
                                    "rawPricesFrom": 1,
                                    "stars": 4
                                },
                                {
                                    "deeplink": "/hotels/search?adults=1&checkin=2024-08-22&checkout=2024-08-25&entity_id=95673827&upsort_hotels=128477912&rooms=1&filters=%7B%22cancellation%22%3A%22free_cancellation%22%7D&source=combined_search&trace_info=eyJzb3VyY2UiOiJjb21iaW5lZF9zZWFyY2giLCJwcmljZSI6MTIwLjAsImN1cnJlbmN5IjoiVVNEIiwiaG90ZWxfaWQiOiIxMjg0Nzc5MTIifQ%3D%3D",
                                    "distance": "1.42 miles from Honolulu International",
                                    "id": "128477912",
                                    "imageUrl": "https://content.skyscnr.com/available/1380937760/1380937760_WxH.jpg",
                                    "name": "Pacific Marina Inn",
                                    "nightsForPrice": "Per night",
                                    "partner": {
                                        "isDbook": false,
                                        "logo": "/images/websites/220x80/h_ad.png",
                                        "name": "Agoda",
                                        "type": "OTA",
                                        "websiteId": "h_ad"
                                    },
                                    "price": "$120",
                                    "pricesFrom": "",
                                    "rating": {
                                        "count": 716,
                                        "description": "Average",
                                        "fivePointsValue": 2.5,
                                        "imageUrl": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/2.5-64600-4.png",
                                        "value": 5
                                    },
                                    "rawPrice": 120,
                                    "rawPricesFrom": 1,
                                    "stars": 2
                                }
                            ],
                            "name": "Free cancellation"
                        }
                    ],
                    "context": {
                        "sessionId": "836f4458a85b43fa86dc7c54a1d6a813",
                        "status": "complete",
                        "totalResults": 12
                    },
                    "results": []
                },
                "brandCarousel": {
                    "buckets": null,
                    "context": {
                        "sessionId": "79597f2f-158e-4e67-ace1-e9208b5f899f",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "brandInlines": {
                    "buckets": null,
                    "context": {
                        "sessionId": "79597f2f-158e-4e67-ace1-e9208b5f899f",
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
                                    "bags": 3,
                                    "carClass": "COMPACT",
                                    "doors": "4-5_door",
                                    "filterPill": {
                                        "composition": {
                                            "sortOrderId": "Medium"
                                        },
                                        "displayName": {
                                            "displayName": "Medium",
                                            "isLocalised": true
                                        },
                                        "filterPillScore": 9.290695,
                                        "logicalName": "Medium"
                                    },
                                    "formattedCarClass": "Compact",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$42",
                                    "formattedTotalPrice": "$125",
                                    "groupKey": "compact",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/compact.png",
                                    "price": {
                                        "amount": "4156",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=compact",
                                    "seats": 4
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
                                        "filterPillScore": 9.24399,
                                        "logicalName": "Large"
                                    },
                                    "formattedCarClass": "Fullsize",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$45",
                                    "formattedTotalPrice": "$133",
                                    "groupKey": "fullsize",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/fullsize.png",
                                    "price": {
                                        "amount": "4430",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=fullsize",
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
                                        "filterPillScore": 9.21423,
                                        "logicalName": "SUV"
                                    },
                                    "formattedCarClass": "SUV",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$47",
                                    "formattedTotalPrice": "$139",
                                    "groupKey": "suv",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/suv.png",
                                    "price": {
                                        "amount": "4604",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=suv",
                                    "seats": 5
                                }
                            ],
                            "name": "SUV"
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
                                        "filterPillScore": 9.031057,
                                        "logicalName": "Luxury"
                                    },
                                    "formattedCarClass": "Premium/Luxury",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$57",
                                    "formattedTotalPrice": "$171",
                                    "groupKey": "premium",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/premium.png",
                                    "price": {
                                        "amount": "5678",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=premium",
                                    "seats": 5
                                }
                            ],
                            "name": "Luxury"
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
                                        "filterPillScore": 8.9920025,
                                        "logicalName": "Small"
                                    },
                                    "formattedCarClass": "Mini",
                                    "formattedDoors": "2-3 doors",
                                    "formattedPrice": "$60",
                                    "formattedTotalPrice": "$178",
                                    "groupKey": "mini",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/mini.png",
                                    "price": {
                                        "amount": "5907",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=mini",
                                    "seats": 4
                                }
                            ],
                            "name": "Small"
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
                                        "filterPillScore": 8.850236,
                                        "logicalName": "People carrier"
                                    },
                                    "formattedCarClass": "People carrier",
                                    "formattedDoors": "4-5 doors",
                                    "formattedPrice": "$68",
                                    "formattedTotalPrice": "$203",
                                    "groupKey": "people_carrier",
                                    "groupType": "indicative",
                                    "image": "https://logos.skyscnr.com/images/carhire/seo/deals-images/people_carrier.png",
                                    "price": {
                                        "amount": "6737",
                                        "currencyCode": "USD",
                                        "unit": "UNIT_CENTI"
                                    },
                                    "redirectUrl": "skyscanner://carhiredayview?pickupplace=95673827&pickuptime=202408221000&dropofftime=202408251000&driversage=30&variant=samedropoff&carclass=passenger_van",
                                    "seats": 7
                                }
                            ],
                            "name": "People carrier"
                        }
                    ],
                    "context": {
                        "sessionId": "f28dc307-a56e-45f1-a819-2857c7b43a3e",
                        "status": "complete",
                        "totalResults": 6
                    },
                    "results": []
                },
                "context": {
                    "sessionId": "ClQIARJQCk4KJDc5NTk3ZjJmLTE1OGUtNGU2Ny1hY2UxLWU5MjA4YjVmODk5ZhACGiRiYjY5MTE1Mi1mODU1LTRhMzAtOWM3ZS1jYjlkNDlkNDY3YjAKKggCEiYKJAogODM2ZjQ0NThhODViNDNmYTg2ZGM3YzU0YTFkNmE4MTMQAQouCAMSKgooCiRmMjhkYzMwNy1hNTZlLTQ1ZjEtYTgxOS0yODU3YzdiNDNhM2UQARIodXNzXzI2ZGJmMjBkLTRkNWMtNGUyMC04MjZkLTJkYWRiZDE5Zjg2NA==",
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
                                        "ecoContenderDelta": 6.034851
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2408220730--31722-1-12240-2408221344|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:44:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T07:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 734,
                                            "id": "13522-2408220730--31722-1-12240-2408221344",
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
                                                    "arrival": "2024-08-22T09:06:00",
                                                    "departure": "2024-08-22T07:30:00",
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
                                                    "durationInMinutes": 156,
                                                    "flightNumber": "224",
                                                    "id": "13522-15062-2408220730-2408220906--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:44:00",
                                                    "departure": "2024-08-22T09:45:00",
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
                                                    "durationInMinutes": 539,
                                                    "flightNumber": "219",
                                                    "id": "15062-12240-2408220945-2408221344--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "ZlNfXpzcK1YU",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "ZlNfXpzcK1YU"
                                        }
                                    ],
                                    "score": 0.999,
                                    "tags": [
                                        "cheapest",
                                        "third_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 6.034851
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2408220645--31722-1-12240-2408221344|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:44:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T06:45:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 779,
                                            "id": "13522-2408220645--31722-1-12240-2408221344",
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
                                                    "arrival": "2024-08-22T08:20:00",
                                                    "departure": "2024-08-22T06:45:00",
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
                                                    "durationInMinutes": 155,
                                                    "flightNumber": "2389",
                                                    "id": "13522-15062-2408220645-2408220820--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:44:00",
                                                    "departure": "2024-08-22T09:45:00",
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
                                                    "durationInMinutes": 539,
                                                    "flightNumber": "219",
                                                    "id": "15062-12240-2408220945-2408221344--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "vfvKwJsOJV1y",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "vfvKwJsOJV1y"
                                        }
                                    ],
                                    "score": 0.959691,
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
                                    "id": "13522-2408220600--31722-1-12240-2408221321|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:21:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T06:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 801,
                                            "id": "13522-2408220600--31722-1-12240-2408221321",
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
                                                    "arrival": "2024-08-22T08:50:00",
                                                    "departure": "2024-08-22T06:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "IAH",
                                                        "flightPlaceId": "IAH",
                                                        "name": "Houston George Bush Intercntl.",
                                                        "parent": {
                                                            "displayCode": "HOU",
                                                            "flightPlaceId": "HOUA",
                                                            "name": "Houston",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 230,
                                                    "flightNumber": "2355",
                                                    "id": "13522-12389-2408220600-2408220850--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:21:00",
                                                    "departure": "2024-08-22T10:05:00",
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
                                                    "durationInMinutes": 496,
                                                    "flightNumber": "253",
                                                    "id": "12389-12240-2408221005-2408221321--31722",
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
                                                        "displayCode": "IAH",
                                                        "flightPlaceId": "IAH",
                                                        "name": "Houston George Bush Intercntl.",
                                                        "parent": {
                                                            "displayCode": "HOU",
                                                            "flightPlaceId": "HOUA",
                                                            "name": "Houston",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "aWS1ZUwuNYn3",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "aWS1ZUwuNYn3"
                                        }
                                    ],
                                    "score": 0.941944,
                                    "tags": [
                                        "third_cheapest"
                                    ]
                                }
                            ],
                            "name": "Best"
                        },
                        {
                            "id": "Cheapest",
                            "items": [
                                {
                                    "eco": {
                                        "ecoContenderDelta": 6.034851
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2408220730--31722-1-12240-2408221344|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:44:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T07:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 734,
                                            "id": "13522-2408220730--31722-1-12240-2408221344",
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
                                                    "arrival": "2024-08-22T09:06:00",
                                                    "departure": "2024-08-22T07:30:00",
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
                                                    "durationInMinutes": 156,
                                                    "flightNumber": "224",
                                                    "id": "13522-15062-2408220730-2408220906--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:44:00",
                                                    "departure": "2024-08-22T09:45:00",
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
                                                    "durationInMinutes": 539,
                                                    "flightNumber": "219",
                                                    "id": "15062-12240-2408220945-2408221344--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "ZlNfXpzcK1YU",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "ZlNfXpzcK1YU"
                                        }
                                    ],
                                    "score": 0.999237,
                                    "tags": [
                                        "cheapest",
                                        "third_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 6.034851
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2408220645--31722-1-12240-2408221344|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:44:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T06:45:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 779,
                                            "id": "13522-2408220645--31722-1-12240-2408221344",
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
                                                    "arrival": "2024-08-22T08:20:00",
                                                    "departure": "2024-08-22T06:45:00",
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
                                                    "durationInMinutes": 155,
                                                    "flightNumber": "2389",
                                                    "id": "13522-15062-2408220645-2408220820--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:44:00",
                                                    "departure": "2024-08-22T09:45:00",
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
                                                    "durationInMinutes": 539,
                                                    "flightNumber": "219",
                                                    "id": "15062-12240-2408220945-2408221344--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "vfvKwJsOJV1y",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "vfvKwJsOJV1y"
                                        }
                                    ],
                                    "score": 0.9990909,
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
                                    "id": "13522-2408220600--31722-1-12240-2408221321|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:21:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T06:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 801,
                                            "id": "13522-2408220600--31722-1-12240-2408221321",
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
                                                    "arrival": "2024-08-22T08:50:00",
                                                    "departure": "2024-08-22T06:00:00",
                                                    "destination": {
                                                        "country": "United States",
                                                        "displayCode": "IAH",
                                                        "flightPlaceId": "IAH",
                                                        "name": "Houston George Bush Intercntl.",
                                                        "parent": {
                                                            "displayCode": "HOU",
                                                            "flightPlaceId": "HOUA",
                                                            "name": "Houston",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    },
                                                    "durationInMinutes": 230,
                                                    "flightNumber": "2355",
                                                    "id": "13522-12389-2408220600-2408220850--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:21:00",
                                                    "departure": "2024-08-22T10:05:00",
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
                                                    "durationInMinutes": 496,
                                                    "flightNumber": "253",
                                                    "id": "12389-12240-2408221005-2408221321--31722",
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
                                                        "displayCode": "IAH",
                                                        "flightPlaceId": "IAH",
                                                        "name": "Houston George Bush Intercntl.",
                                                        "parent": {
                                                            "displayCode": "HOU",
                                                            "flightPlaceId": "HOUA",
                                                            "name": "Houston",
                                                            "type": "City"
                                                        },
                                                        "type": "Airport"
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "aWS1ZUwuNYn3",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "aWS1ZUwuNYn3"
                                        }
                                    ],
                                    "score": 0.9990195,
                                    "tags": [
                                        "third_cheapest"
                                    ]
                                }
                            ],
                            "name": "Cheapest"
                        },
                        {
                            "id": "Fastest",
                            "items": [
                                {
                                    "eco": {
                                        "ecoContenderDelta": 14.04146
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2408221030--32385-0-12240-2408221508|12240-2408251715--32385-0-12712-2408260900",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T15:08:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T10:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 638,
                                            "id": "12712-2408221030--32385-0-12240-2408221508",
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
                                                    "arrival": "2024-08-22T15:08:00",
                                                    "departure": "2024-08-22T10:30:00",
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
                                                    "durationInMinutes": 638,
                                                    "flightNumber": "268",
                                                    "id": "12712-12240-2408221030-2408221508--32385",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T09:00:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T17:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 585,
                                            "id": "12240-2408251715--32385-0-12712-2408260900",
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
                                                    "arrival": "2024-08-26T09:00:00",
                                                    "departure": "2024-08-25T17:15:00",
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
                                                    "durationInMinutes": 585,
                                                    "flightNumber": "190",
                                                    "id": "12240-12712-2408251715-2408260900--32385",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$1,220",
                                        "pricingOptionId": "dATiU5i7cEa0",
                                        "raw": 1219.39
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "dela"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "dela",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 1219.39
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 1219.39
                                            },
                                            "pricingOptionId": "dATiU5i7cEa0"
                                        }
                                    ],
                                    "score": 0.9990231,
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
                                    "id": "12712-2408221000--32249-0-12240-2408221455|12240-2408251545--32249-0-12712-2408260725",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T14:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T10:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 655,
                                            "id": "12712-2408221000--32249-0-12240-2408221455",
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
                                                    "arrival": "2024-08-22T14:55:00",
                                                    "departure": "2024-08-22T10:00:00",
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
                                                    "durationInMinutes": 655,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2408221000-2408221455--32249",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:25:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T15:45:00",
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
                                            "id": "12240-2408251545--32249-0-12712-2408260725",
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
                                                    "arrival": "2024-08-26T07:25:00",
                                                    "departure": "2024-08-25T15:45:00",
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
                                                    "id": "12240-12712-2408251545-2408260725--32249",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$1,233",
                                        "pricingOptionId": "nUkNx2Gofg2I",
                                        "raw": 1232.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "hawa"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "hawa",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 1232.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 1232.4
                                            },
                                            "pricingOptionId": "nUkNx2Gofg2I"
                                        }
                                    ],
                                    "score": 0.9600779,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 6.034851
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "13522-2408220730--31722-1-12240-2408221344|12240-2408251320--31722-1-11442-2408260724",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T13:44:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T07:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 734,
                                            "id": "13522-2408220730--31722-1-12240-2408221344",
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
                                                    "arrival": "2024-08-22T09:06:00",
                                                    "departure": "2024-08-22T07:30:00",
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
                                                    "durationInMinutes": 156,
                                                    "flightNumber": "224",
                                                    "id": "13522-15062-2408220730-2408220906--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-22T13:44:00",
                                                    "departure": "2024-08-22T09:45:00",
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
                                                    "durationInMinutes": 539,
                                                    "flightNumber": "219",
                                                    "id": "15062-12240-2408220945-2408221344--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:24:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -31722,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
                                                        "name": "United"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T13:20:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "EWR",
                                                "entityId": "95565059",
                                                "id": "EWR",
                                                "isHighlighted": true,
                                                "name": "New York Newark"
                                            },
                                            "durationInMinutes": 724,
                                            "id": "12240-2408251320--31722-1-11442-2408260724",
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
                                                    "arrival": "2024-08-25T21:48:00",
                                                    "departure": "2024-08-25T13:20:00",
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
                                                    "durationInMinutes": 328,
                                                    "flightNumber": "1157",
                                                    "id": "12240-13416-2408251320-2408252148--31722",
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
                                                    }
                                                },
                                                {
                                                    "arrival": "2024-08-26T07:24:00",
                                                    "departure": "2024-08-25T23:15:00",
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
                                                    "durationInMinutes": 309,
                                                    "flightNumber": "2241",
                                                    "id": "13416-11442-2408252315-2408260724--31722",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 1,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$669",
                                        "pricingOptionId": "ZlNfXpzcK1YU",
                                        "raw": 668.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "uair"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "uair",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 668.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 668.4
                                            },
                                            "pricingOptionId": "ZlNfXpzcK1YU"
                                        }
                                    ],
                                    "score": 0.237776,
                                    "tags": [
                                        "cheapest",
                                        "third_shortest"
                                    ]
                                }
                            ],
                            "name": "Fastest"
                        },
                        {
                            "id": "Direct",
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
                                    "id": "12712-2408221000--32249-0-12240-2408221455|12240-2408251545--32249-0-12712-2408260725",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T14:55:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T10:00:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 655,
                                            "id": "12712-2408221000--32249-0-12240-2408221455",
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
                                                    "arrival": "2024-08-22T14:55:00",
                                                    "departure": "2024-08-22T10:00:00",
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
                                                    "durationInMinutes": 655,
                                                    "flightNumber": "51",
                                                    "id": "12712-12240-2408221000-2408221455--32249",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T07:25:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32249,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/HA.png",
                                                        "name": "Hawaiian Airlines"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T15:45:00",
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
                                            "id": "12240-2408251545--32249-0-12712-2408260725",
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
                                                    "arrival": "2024-08-26T07:25:00",
                                                    "departure": "2024-08-25T15:45:00",
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
                                                    "id": "12240-12712-2408251545-2408260725--32249",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$1,233",
                                        "pricingOptionId": "nUkNx2Gofg2I",
                                        "raw": 1232.4
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "hawa"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "hawa",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 1232.4
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 1232.4
                                            },
                                            "pricingOptionId": "nUkNx2Gofg2I"
                                        }
                                    ],
                                    "score": 0.692394,
                                    "tags": [
                                        "second_shortest"
                                    ]
                                },
                                {
                                    "eco": {
                                        "ecoContenderDelta": 14.04146
                                    },
                                    "fareAttributes": {},
                                    "farePolicy": {
                                        "isCancellationAllowed": false,
                                        "isChangeAllowed": false,
                                        "isPartiallyChangeable": false,
                                        "isPartiallyRefundable": false
                                    },
                                    "hasFlexibleOptions": false,
                                    "id": "12712-2408221030--32385-0-12240-2408221508|12240-2408251715--32385-0-12712-2408260900",
                                    "isMashUp": false,
                                    "isProtectedSelfTransfer": false,
                                    "isSelfTransfer": false,
                                    "legs": [
                                        {
                                            "arrival": "2024-08-22T15:08:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-22T10:30:00",
                                            "destination": {
                                                "city": "Honolulu",
                                                "country": "United States",
                                                "displayCode": "HNL",
                                                "entityId": "95673827",
                                                "id": "HNL",
                                                "isHighlighted": false,
                                                "name": "Honolulu International"
                                            },
                                            "durationInMinutes": 638,
                                            "id": "12712-2408221030--32385-0-12240-2408221508",
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
                                                    "arrival": "2024-08-22T15:08:00",
                                                    "departure": "2024-08-22T10:30:00",
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
                                                    "durationInMinutes": 638,
                                                    "flightNumber": "268",
                                                    "id": "12712-12240-2408221030-2408221508--32385",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 0
                                        },
                                        {
                                            "arrival": "2024-08-26T09:00:00",
                                            "carriers": {
                                                "marketing": [
                                                    {
                                                        "id": -32385,
                                                        "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
                                                        "name": "Delta"
                                                    }
                                                ],
                                                "operationType": "fully_operated"
                                            },
                                            "departure": "2024-08-25T17:15:00",
                                            "destination": {
                                                "city": "New York",
                                                "country": "United States",
                                                "displayCode": "JFK",
                                                "entityId": "95565058",
                                                "id": "JFK",
                                                "isHighlighted": false,
                                                "name": "New York John F. Kennedy"
                                            },
                                            "durationInMinutes": 585,
                                            "id": "12240-2408251715--32385-0-12712-2408260900",
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
                                                    "arrival": "2024-08-26T09:00:00",
                                                    "departure": "2024-08-25T17:15:00",
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
                                                    "durationInMinutes": 585,
                                                    "flightNumber": "190",
                                                    "id": "12240-12712-2408251715-2408260900--32385",
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
                                                    }
                                                }
                                            ],
                                            "stopCount": 0,
                                            "timeDeltaInDays": 1
                                        }
                                    ],
                                    "price": {
                                        "formatted": "$1,220",
                                        "pricingOptionId": "dATiU5i7cEa0",
                                        "raw": 1219.39
                                    },
                                    "pricingOptions": [
                                        {
                                            "agentIds": [
                                                "dela"
                                            ],
                                            "items": [
                                                {
                                                    "agentId": "dela",
                                                    "bookingProposition": "PBOOK",
                                                    "price": {
                                                        "amount": 1219.39
                                                    }
                                                }
                                            ],
                                            "price": {
                                                "amount": 1219.39
                                            },
                                            "pricingOptionId": "dATiU5i7cEa0"
                                        }
                                    ],
                                    "score": 0.681782,
                                    "tags": [
                                        "shortest"
                                    ]
                                }
                            ],
                            "name": "Direct"
                        }
                    ],
                    "context": {
                        "sessionId": "79597f2f-158e-4e67-ace1-e9208b5f899f",
                        "status": "incomplete",
                        "totalResults": 10
                    },
                    "creatives": null,
                    "destinationImageUrl": "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
                    "filterStats": null,
                    "results": []
                },
                "packages": {
                    "buckets": null,
                    "context": {
                        "sessionId": "79597f2f-158e-4e67-ace1-e9208b5f899f",
                        "status": "incomplete",
                        "totalResults": 0
                    },
                    "results": []
                },
                "token": "eyJjYyI6ICJlY29ub215IiwgImEiOiAxLCAiYyI6IDAsICJpIjogMCwgImwiOiBbWyJOWUNBIiwgIkhOTCIsICIyMDI0LTA4LTIyIl0sIFsiSE5MIiwgIk5ZQ0EiLCAiMjAyNC0wOC0yNSJdXX0="
            }
        }
    }
}
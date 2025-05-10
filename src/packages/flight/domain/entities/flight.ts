export interface FlightProps {
    accommodations: Accommodation;
    brandCarousel: BrandCarousel;
    brandInlines: BrandInlines;
    carHire: CarHire;
    context: ContextWithoutTotalResults;
    itineraries: Itineraries;
    packages: Packages;
    token: string;
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

export class Flight {
    public accommodations: Accommodation;
    public brandCarousel: BrandCarousel;
    public brandInlines: BrandInlines;
    public carHire: CarHire;
    public context: ContextWithoutTotalResults;
    public itineraries: Itineraries;
    public packages: Packages;
    public token: string;

    constructor(flight: FlightProps) {
        this.accommodations = flight.accommodations;
        this.brandCarousel = flight.brandCarousel;
        this.brandInlines = flight.brandInlines;
        this.carHire = flight.carHire;
        this.context = flight.context;
        this.itineraries = flight.itineraries;
        this.packages = flight.packages;
        this.token = flight.token;
    }

    applyDiscount(): void {
        // TODO: Implement discount logic, pending confirmation on the search flight response
        throw new Error('Not implemented');
    }
}



import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { DateTime } from 'luxon';

import { Flight } from '@flight/domain/entities/flight';
import {
    SearchFlightUseCase,
    ValidateDateParams,
    ShouldApplyDiscountParams
} from '@flight/application/use-cases/search-flight';

import { IFlightDataService } from '@flight/application/interfaces/flight-data-service';

import {
    DateValidator,
    ParseDateParams
} from '@common/utils/date';

describe('@flight/application/use-cases/search-flight', () => {
    let useCase: SearchFlightUseCase;
    let mockFlightDataService: jest.Mocked<IFlightDataService>;

    let parsedDateSpy: jest.SpyInstance;
    let shouldApplyDiscountSpy: jest.SpyInstance;
    let getDaysBetweenDatesSpy: jest.SpyInstance;

    beforeEach(async () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-01-15').getTime());

        parsedDateSpy = jest.spyOn(DateValidator, 'parseDate');
        jest.spyOn(SearchFlightUseCase, 'validateDate');
        shouldApplyDiscountSpy = jest.spyOn(SearchFlightUseCase, 'shouldApplyDiscount');
        getDaysBetweenDatesSpy = jest.spyOn(DateValidator, 'getDaysBetweenDates');

        mockFlightDataService = {
            searchFlight: jest.fn(),
            getFlightDestinations: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchFlightUseCase,
                {
                    provide: 'IFlightDataService',
                    useValue: mockFlightDataService,
                },
            ],
        }).compile();

        useCase = module.get<SearchFlightUseCase>(SearchFlightUseCase);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    describe('#execute', () => {
        const dto = {
            departureDate: '20-03-2024',
            returnDate: '25-03-2024',
            origin: 'KUL',
            originId: '1',
            destination: 'SIN',
            destinationId: '2',
        };

        const flight = new Flight({
            id: 'test-id-1',
            itinerary: {
                price: { formatted: '100', pricingOptionId: 'test-pricing-option-id', raw: 100 },
            },
        });

        let sortByItineraryPriceSpy: jest.SpyInstance;

        beforeEach(() => {
            jest.spyOn(flight, 'applyDiscount');
            sortByItineraryPriceSpy = jest.spyOn(SearchFlightUseCase, 'sortItinerariesByPrice');
        });

        function assertParseDate(callIndex: number, params: ParseDateParams) {
            expect(DateValidator.parseDate).toHaveBeenNthCalledWith(callIndex, params.date, params.format);
        }

        function assertValidateDate(params: ValidateDateParams) {
            expect(SearchFlightUseCase.validateDate).toHaveBeenCalledWith(params);
        }

        function assertShouldApplyDiscount(params: ShouldApplyDiscountParams) {
            expect(SearchFlightUseCase.shouldApplyDiscount).toHaveBeenCalledWith(params);
        }

        it('should successfully search flights with valid dates', async () => {
            mockFlightDataService.searchFlight.mockResolvedValue([flight]);

            const result = await useCase.execute(dto);

            expect(parsedDateSpy).toHaveBeenCalledTimes(2);
            assertParseDate(1, {
                date: dto.departureDate,
                format: 'dd-MM-yyyy',
            });

            assertParseDate(2, {
                date: dto.returnDate,
                format: 'dd-MM-yyyy',
            });

            assertValidateDate({
                departureDate: parsedDateSpy.mock.results[0].value,
                returnDate: parsedDateSpy.mock.results[1].value,
            });

            // TODO: Update assertion when actual response body is known
            expect(mockFlightDataService.searchFlight).toHaveBeenCalledWith(dto);

            assertShouldApplyDiscount({
                departureDate: parsedDateSpy.mock.results[0].value,
                returnDate: parsedDateSpy.mock.results[1].value,
            });

            expect(flight.applyDiscount).not.toHaveBeenCalled();

            expect(sortByItineraryPriceSpy).toHaveBeenCalledWith([flight]);

            const sortedFlights = sortByItineraryPriceSpy.mock.results[0].value;

            expect(result).toBe(sortedFlights);
        });

        it('should apply discount when trip duration is more than 10 days', async () => {
            const longTripQuery = {
                ...dto,
                departureDate: '20-03-2024',
                returnDate: '31-03-2024',
            };

            mockFlightDataService.searchFlight.mockResolvedValue([flight]);

            const result = await useCase.execute(longTripQuery);

            expect(flight.applyDiscount).toHaveBeenCalled();

            expect(sortByItineraryPriceSpy).toHaveBeenCalledWith([flight]);

            const sortedFlights = sortByItineraryPriceSpy.mock.results[0].value;

            expect(result).toBe(sortedFlights);
        });

        it('should throw BadRequestException when departure date is not valid', async () => {
            const invalidDateQuery = {
                ...dto,
                departureDate: 'invalid-date',
            };

            await expect(useCase.execute(invalidDateQuery)).rejects.toThrow(
                new BadRequestException('Invalid date')
            );

            expect(parsedDateSpy).toHaveBeenCalledTimes(1);
            assertParseDate(1, {
                date: invalidDateQuery.departureDate,
                format: 'dd-MM-yyyy',
            });

            expect(mockFlightDataService.searchFlight).not.toHaveBeenCalled();
            expect(SearchFlightUseCase.shouldApplyDiscount).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException when return date is not valid', async () => {
            const invalidDateQuery = {
                ...dto,
                returnDate: 'invalid-date',
            };

            await expect(useCase.execute(invalidDateQuery)).rejects.toThrow(
                new BadRequestException('Invalid date')
            );

            expect(parsedDateSpy).toHaveBeenCalledTimes(2);
            assertParseDate(1, {
                date: invalidDateQuery.departureDate,
                format: 'dd-MM-yyyy',
            });

            assertParseDate(2, {
                date: invalidDateQuery.returnDate,
                format: 'dd-MM-yyyy',
            });

            expect(mockFlightDataService.searchFlight).not.toHaveBeenCalled();
            expect(SearchFlightUseCase.shouldApplyDiscount).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException when date validation fails', async () => {
            const pastDateQuery = {
                ...dto,
                departureDate: '10-01-2024',
            };

            await expect(useCase.execute(pastDateQuery)).rejects.toThrow(
                new BadRequestException('departureDate must be in the future')
            );

            assertParseDate(1, {
                date: pastDateQuery.departureDate,
                format: 'dd-MM-yyyy',
            });

            assertParseDate(2, {
                date: pastDateQuery.returnDate,
                format: 'dd-MM-yyyy',
            });

            assertValidateDate({
                departureDate: parsedDateSpy.mock.results[0].value,
                returnDate: parsedDateSpy.mock.results[1].value,
            });

            expect(mockFlightDataService.searchFlight).not.toHaveBeenCalled();
            expect(SearchFlightUseCase.shouldApplyDiscount).not.toHaveBeenCalled();
        });
    });

    describe('#validateDate', () => {
        let isPastDateSpy: jest.SpyInstance;
        let isBeforeDateSpy: jest.SpyInstance;

        beforeEach(() => {
            isPastDateSpy = jest.spyOn(DateValidator, 'isPastDate');
            isBeforeDateSpy = jest.spyOn(DateValidator, 'isBeforeDate');
        });

        afterEach(() => {
            isPastDateSpy.mockClear();
            isBeforeDateSpy.mockClear();
        });

        function assertIsPastDate(index: number, date: DateTime) {
            expect(isPastDateSpy).toHaveBeenNthCalledWith(index, date);
        }

        it('should not throw error for valid dates', () => {
            const validDates = {
                departureDate: DateTime.fromFormat('16-01-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('20-01-2024', 'dd-MM-yyyy'),
            };

            expect(() => SearchFlightUseCase.validateDate(validDates)).not.toThrow();

            expect(isPastDateSpy).toHaveBeenCalledTimes(2);
            assertIsPastDate(1, validDates.departureDate);
            assertIsPastDate(2, validDates.returnDate);
        });

        it('should throw BadRequestException for past departure date', () => {
            const pastDepartureDate = {
                departureDate: DateTime.fromFormat('14-01-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('20-01-2024', 'dd-MM-yyyy'),
            };

            expect(() => SearchFlightUseCase.validateDate(pastDepartureDate)).toThrow(
                new BadRequestException('departureDate must be in the future')
            );

            expect(isPastDateSpy).toHaveBeenCalledTimes(1);
            expect(isPastDateSpy).toHaveBeenCalledWith(pastDepartureDate.departureDate);
            expect(isBeforeDateSpy).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException for past return date', () => {
            const pastReturnDate = {
                departureDate: DateTime.fromFormat('16-01-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('14-01-2024', 'dd-MM-yyyy'),
            };

            expect(() => SearchFlightUseCase.validateDate(pastReturnDate)).toThrow(
                new BadRequestException('returnDate must be in the future')
            );

            expect(isPastDateSpy).toHaveBeenCalledTimes(2);
            assertIsPastDate(1, pastReturnDate.departureDate);
            assertIsPastDate(2, pastReturnDate.returnDate);

            expect(isBeforeDateSpy).not.toHaveBeenCalled();
        });

        it('should throw BadRequestException when departure date is after return date', () => {
            const invalidDates = {
                departureDate: DateTime.fromFormat('26-01-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('20-01-2024', 'dd-MM-yyyy'),
            };

            expect(() => SearchFlightUseCase.validateDate(invalidDates)).toThrow(
                new BadRequestException('returnDate must be after departureDate')
            );

            expect(isPastDateSpy).toHaveBeenCalledTimes(2);
            assertIsPastDate(1, invalidDates.departureDate);
            assertIsPastDate(2, invalidDates.returnDate);

            expect(isBeforeDateSpy).toHaveBeenCalledWith({
                targetDate: invalidDates.returnDate,
                referenceDate: invalidDates.departureDate,
            });
        });
    });

    describe('#sortItinerariesByPrice', () => {
        it('should sort itineraries by price', () => {
            const flights = [new Flight({
                id: 'test-id-1',
                itinerary: {
                    price: {
                        raw: 300,
                        formatted: '300',
                        pricingOptionId: 'test-pricing-option-id'
                    }
                }
            }), new Flight({
                id: 'test-id-2',
                itinerary: {
                    price: {
                        raw: 200,
                        formatted: '200',
                        pricingOptionId: 'test-pricing-option-id'
                    }
                }
            }), new Flight({
                id: 'test-id-3',
                itinerary: {
                    price: {
                        raw: 100,
                        formatted: '100',
                        pricingOptionId: 'test-pricing-option-id'
                    }
                }
            })];

            const sortedFlights = SearchFlightUseCase.sortItinerariesByPrice(flights);

            expect(sortedFlights).toEqual([
                {
                    id: 'test-id-3',
                    itinerary: {
                        price: { raw: 100, formatted: '100', pricingOptionId: 'test-pricing-option-id' }
                    }
                },
                {
                    id: 'test-id-2',
                    itinerary: { price: { raw: 200, formatted: '200', pricingOptionId: 'test-pricing-option-id' } }
                },
                {
                    id: 'test-id-1',
                    itinerary: { price: { raw: 300, formatted: '300', pricingOptionId: 'test-pricing-option-id' } }
                }
            ]);
        });
    });

    describe('#shouldApplyDiscount', () => {
        it('should return true when trip duration is more than 10 days', () => {
            const longTrip = {
                departureDate: DateTime.fromFormat('20-03-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('31-03-2024', 'dd-MM-yyyy'),
            };

            const result = SearchFlightUseCase.shouldApplyDiscount(longTrip);

            expect(getDaysBetweenDatesSpy).toHaveBeenCalledWith({
                firstDate: longTrip.departureDate,
                secondDate: longTrip.returnDate,
            });

            expect(result).toBe(true);
        });

        it('should return false when trip duration is less than or equal to 10 days', () => {
            const shortTrip = {
                departureDate: DateTime.fromFormat('20-03-2024', 'dd-MM-yyyy'),
                returnDate: DateTime.fromFormat('30-03-2024', 'dd-MM-yyyy'),
            };

            const result = SearchFlightUseCase.shouldApplyDiscount(shortTrip);

            expect(getDaysBetweenDatesSpy).toHaveBeenCalledWith({
                firstDate: shortTrip.departureDate,
                secondDate: shortTrip.returnDate,
            });

            expect(result).toBe(false);
        });
    });
});
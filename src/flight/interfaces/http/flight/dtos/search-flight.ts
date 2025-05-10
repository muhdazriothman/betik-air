import { IsString, IsNotEmpty } from 'class-validator';
import { IsDateFormat } from '@common/decorators/is-date-format';

export class SearchFlightDto {
    @IsString()
    @IsNotEmpty()
    @IsDateFormat('dd-MM-yyyy', {
        message: 'departureDate must be in DD-MM-YYYY format',
    })
    departureDate: string;

    @IsString()
    @IsNotEmpty()
    @IsDateFormat('dd-MM-yyyy', {
        message: 'departureDate must be in DD-MM-YYYY format',
    })
    returnDate: string;

    @IsString()
    @IsNotEmpty()
    origin: string;

    @IsString()
    @IsNotEmpty()
    originId: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsString()
    @IsNotEmpty()
    destinationId: string;
}

import { Module } from '@nestjs/common';
import { FlightModule } from '@modules/flight';

@Module({
    imports: [FlightModule],
    controllers: [],
    providers: [],
})
export class AppModule { }

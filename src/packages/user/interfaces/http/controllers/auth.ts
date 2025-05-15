import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '@user/interfaces/http/dtos/login';
import { LoginUseCase } from '@user/application/use-cases/login';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }
}

import { JwtStrategy } from '@user/interfaces/http/strategies/jwt';

describe('@user/interfaces/http/strategies/jwt', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(() => {
        jwtStrategy = new JwtStrategy();
    });

    it('should be properly instantiated', () => {
        expect(jwtStrategy).toBeDefined();
        expect(jwtStrategy.validate).toBeDefined();
    });

    describe('#constructor', () => {
        it('should be configured with the correct options', () => {
            expect(jwtStrategy).toBeDefined();
        });
    });

    describe('#validate', () => {
        it('should return the payload unchanged', async () => {
            const payload = {
                sub: '123',
                username: 'testuser'
            };

            const result = await jwtStrategy.validate(payload);

            expect(result).toBe(payload);
        });
    });
});
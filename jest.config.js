module.exports = {
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@flight/(.*)$': '<rootDir>/src/flight/$1',
        '^@modules/(.*)$': '<rootDir>/src/modules/$1'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
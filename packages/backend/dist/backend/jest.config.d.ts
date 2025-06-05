declare const _default: {
    testEnvironment: string;
    transform: {
        "^.+\\.tsx?$": ["ts-jest", import("ts-jest").DefaultTransformOptions];
    };
    testTimeout: number;
    moduleNameMapper: {
        '^@/(.*)$': string;
        '^@backend/(.*)$': string;
        '^@common/(.*)$': string;
    };
    globalSetup: string;
    globalTeardown: string;
};
export default _default;

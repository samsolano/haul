// Unfortunately Jest needs ts-node for this file to be TS
// We use tsx so that's not gonna happen

const {createDefaultPreset} = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },

  // This needs to be longer for mongodb-memory-server
  testTimeout: 30000,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@backend/(.*)$': '<rootDir>/$1',
    '^@common/(.*)$': '<rootDir>/../../common/$1',
  },

  globalSetup: '<rootDir>/tests/setup/setup.ts',
  globalTeardown: '<rootDir>/tests/setup/teardown.ts'
};
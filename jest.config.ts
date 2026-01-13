// https://kulshekhar.github.io/ts-jest/docs
import type { Config } from 'jest';
import { createDefaultPreset, pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  ...createDefaultPreset({
    tsconfig: '<rootDir>/tsconfig.jest.json',
  }),

  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@/*': ['src/*'],
    },
    {
      prefix: '<rootDir>',
    }
  ),
  roots: ['<rootDir>/__test__'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.test.{ts,tsx}'],
} satisfies Config;

export default config;

import { defaults } from 'jest-config';
import { createDefaultPreset } from 'ts-jest'

/** @type {import('jest').Config} */
const config = {
  ...createDefaultPreset(),
  testEnvironment: 'node',
  moduleDirectories: [
    'node_modules',
    'dist'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    "/build/", 
    "/node_modules/"
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'mjs'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.cjs',
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
};

export default config;
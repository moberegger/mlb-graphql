import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  globals: {
    "ts-jest": { isolatedModules: true, useESM: true },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  preset: "ts-jest/presets/default-esm",
  setupFilesAfterEnv: ["jest-extended/all", "<rootDir>/jest.setup.ts"],
};

export default config;

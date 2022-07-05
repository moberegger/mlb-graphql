import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  globals: {
    "ts-jest": { useESM: true },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  preset: "ts-jest/presets/default-esm",
  setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
};

export default config;

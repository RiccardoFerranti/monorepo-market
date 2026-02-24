import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)", "<rootDir>/src/**/*.spec.(ts|tsx)"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
};

export default config;

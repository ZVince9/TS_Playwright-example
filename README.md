# Test Playwright Project

This is a simple project that includes one test, using POM model, TypeScript, Allure reporting.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running Tests](#running-tests)
- [Dependencies](#dependencies)
- [Improvements](#improvements)

## Playwright

[Playwright](https://github.com/microsoft/playwright) is a Node.js library that provides a high-level API for automating browsers (Chromium, Firefox, and WebKit) for various automation tasks, including testing.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)

### Installation

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/YOUR_NAME/TS_Playwright-example.git

   ```

2. npm install

   ```sh
   npm install

   ```

## Runing Tests

- npm run test-local-chrome: To run the tests using local Chromium, use the following command.
- npm run test-local-all-browsers: To run the tests in all supported browsers (Chromium, Firefox, Webkit), use the following command
- npm run test:reporter: To generate Allure reports and view them in your default web browser, use the following command. More about allure reports and view you can visit: https://www.npmjs.com/package/allure-playwright

^ depending which suite to run

## Dependencies

- @playwright/test: Playwright for end-to-end testing.
- allure-commandline: Allure command-line tool for generating and viewing test reports.
- allure-playwright: Allure integration for Playwright to enhance test reporting.
- axios: Promise-based HTTP client for making HTTP requests.
- dotenv: Loads environment variables from a .env file.

## Improvements

- Adjust allure reporting to have better viewability
- .env file is not added in gitignore just for visibility
- check with structure and make a bit more reusability and dynamic with classes

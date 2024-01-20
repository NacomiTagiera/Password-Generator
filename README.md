# Password Generator

This is a simple web application built with Next.js that generates random passwords. It allows you to customize the password length and choose whether to include digits, lowercase letters, uppercase letters, and symbols. The app is deployed on Vercel and can be accessed at [`https://nextjs-mui-password-generator.vercel.app/`](https://nextjs-mui-password-generator.vercel.app/)

<p align="center">
  <img src="https://github.com/NacomiTagiera/Password-Generator/assets/106376178/08650282-76a7-4838-9c15-fe0a560c71a5" alt="Password Generator">
</p>

## Features

- Generate random passwords with customizable length and character sets.
- Copy the generated password to the clipboard with a single click.

## Technologies used

- **Next.js** - Popular React framework for building server-side rendered applications. I haven't really utilized the SSR capabilities of Next.js in this project, but I chose it because it provides a great developer experience and makes it easy to build a production-ready React app.
- **Material UI** - popular React UI component library for creating beautiful and responsive UIs.
- **Jest** - JavaScript testing framework for unit and component testing.
- **React Testing Library** - set of utilities for testing React components.
- **Cypress** - JavaScript end-to-end testing framework

## Getting Started

To install and start the app locally, follow these steps:

1. Clone the repo:

```bash
git clone https://github.com/NacomiTagiera/Password-Generator.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running unit tests

To run the Jest unit tests, follow these steps:

1. Open a terminal in your project directory.
2. Run the following command:

```bash
npm run test
```

This will run all the Jest unit tests in the terminal.

## Running E2E tests

To run the Cypress E2E tests, follow these steps:

1. Open a terminal in your project directory.
2. Run the following command to open the Cypress Test Runner:

```bash
npx cypress open
```

This will open the Cypress Test Runner window.

3. Click on the test file you want to run in the Cypress Test Runner.

## Running E2E tests in headless mode

If you prefer to run the tests in the terminal without opening the Cypress Test Runner window, you can use the following command:

```bash
npx cypress run
```

This will execute the tests headlessly, and the results will be displayed in the terminal.

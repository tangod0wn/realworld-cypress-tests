## Installation - Cypress

For installing cypress cd to the project's root folder and run:

    npm install

## Tests

| Type | Location                                                 |
| ---- | -------------------------------------------------------- |
| api  | [front-end/cypress/e2e/api/](front-end/cypress/e2e/api/) |
| ui   | [front-end/cypress/e2e/ui/](front-end/cypress/e2e/ui/)   |

## Running tests

For opening cypress client cd to the project's root folder and run:

    npx cypress open

Or if running from the CLI use one of the scripts found in package.json:

```
'test:chrome': 'cypress run --browser chrome',
'test:firefox': 'cypress run --browser firefox',
'test:edge': 'cypress run --browser edge',
'test:electron': 'cypress run --browser electron',
'test:all-browsers': 'npm run test:chrome && npm run test:firefox && npm run test:edge && npm run test:electron',
'test:api': 'cypress run --spec 'cypress/e2e/api/'',
'test:ui': 'cypress run --spec 'cypress/e2e/ui/'',
```


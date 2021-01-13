# Swagger-ui-middleware

[![npm](https://img.shields.io/npm/v/@coorpacademy/eslint-plugin-coorpacademy.svg)](https://www.npmjs.com/package/@coorpacademy/swagger-ui-express)
[![Build Status](https://travis-ci.com/CoorpAcademy/swagger-ui-express.svg?branch=master)](https://travis-ci.com/CoorpAcademy/swagger-ui-express)
[![codecov](https://codecov.io/gh/CoorpAcademy/swagger-ui-express/branch/master/graph/badge.svg)](https://codecov.io/gh/CoorpAcademy/swagger-ui-express)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Express Helper to ship swagger-ui explorer :world_map:

```javascript
const express = require('express');
const createSwaggerUiMiddleware = require('@coorpacademy/swagger-ui-express');

const app = express();

app.use(
  createSwaggerUiMiddleware({
    swaggerDoc: require('./swagger.json'),
    apiDocs: '/api-docs',
    swaggerUi: '/explorer',
    indexPath: 'index.html'
  })
);

app.listen(8000);
```

Open [http://localhost:8000/explorer](`http://localhost:8000/explorer`)

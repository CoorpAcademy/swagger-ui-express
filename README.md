[![Build Status](https://travis-ci.org/CoorpAcademy/swagger-ui-middleware.svg?branch=master)](https://travis-ci.org/CoorpAcademy/swagger-ui-middleware)

# Swagger-ui-middleware

```javascript
const express = require('express');
const createSwaggerUiMiddleware = require('@coorpacademy/swagger-ui-middleware');

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

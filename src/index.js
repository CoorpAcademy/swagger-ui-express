const {promisify} = require('util');
const {join} = require('path');
const {readFile} = require('fs');
const {Router} = require('express');
const SwaggerUiDir = require('swagger-ui-dist');
const serveStatic = require('serve-static');

const readFileP = promisify(readFile);

module.exports = ({
  swaggerDoc,
  apiDocs = '/api-docs',
  swaggerUiDir = SwaggerUiDir.absolutePath(),
  swaggerUi = '/explorer',
  indexPath = join(__dirname, '../public/index.html')
} = {}) => {
  const router = new Router();
  const staticSwaggerUi = serveStatic(swaggerUiDir);
  const staticPublic = serveStatic(join(__dirname, '../public/'));
  const indexP = readFileP(indexPath, {encoding: 'UTF8'});

  router.get(apiDocs, (req, res) => {
    res.json(swaggerDoc);
  });

  router.use(
    swaggerUi,
    (req, res, next) => {
      res.setHeader('Swagger-API-Docs-URL', apiDocs);
      next();
    },
    (req, res, next) => {
      if (req.url !== '' && req.url !== '/') return next();

      return indexP.then(file => res.send(file)).catch(next);
    },
    staticSwaggerUi,
    staticPublic
  );

  return router;
};

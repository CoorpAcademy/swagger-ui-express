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

  const injectHeader = (req, res, next) => {
    res.setHeader('Swagger-API-Docs-URL', apiDocs);
    next();
  };

  const serveIndex = (req, res, next) => {
    if (req.path !== '/') return next();

    return indexP.then(file => res.send(file)).catch(next);
  };

  router.use((req, res, next) => {
    if (req.path === swaggerUi) {
      const {search} = new URL(req.url, 'http://this-is-a-stub-base.fix');
      return res.redirect(`${swaggerUi}/${search}`);
    }
    next();
  });

  router.get(apiDocs, (req, res) => {
    res.json(swaggerDoc);
  });

  router.use(swaggerUi, injectHeader, serveIndex, staticSwaggerUi, staticPublic);

  return router;
};

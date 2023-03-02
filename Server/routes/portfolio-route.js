var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var PortfolioRepo = require('../repositiories/portfolio-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var PortfolioController = require('../controllers/portfolio-controller.js');

var portfolioRepo = new PortfolioRepo(db);
var portfolioController = new PortfolioController(
    portfolioRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], portfolioController.createPortfolio);
router.patch('/:portfolioID', [cookieJwtAuth], portfolioController.patchPortfolio);
router.delete('/:portfolioID', [cookieJwtAuth], portfolioController.deletePortfolio);
router.get('', portfolioController.getAllPortfolios);
router.get('/service', [portfolioController.getServicePortfoliosSortedByPrice, portfolioController.getServicePortfolios]);
router.get('/:portfolioID', portfolioController.getPortfolio);

module.exports = router;
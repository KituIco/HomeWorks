var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var PortfolioRepo = require('../repositiories/portfolio-repo.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var PortfolioValidator = require('../validators/portfolio-validator.js');
var { nanoid } = require('nanoid');
var PortfolioController = require('../controllers/portfolio-controller.js');

var portfolioRepo = new PortfolioRepo(db);
var serviceRepo = new ServiceRepo(db);
var portfolioValidator = new PortfolioValidator(
    clientErrors, 
    portfolioRepo, 
    serviceRepo
);
var portfolioController = new PortfolioController(
    portfolioRepo,
    clientErrors,
    portfolioValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [portfolioController.createPortfolio, errorHandler]);
router.patch('/:portfolioID', [cookieJwtAuth], [portfolioController.patchPortfolio, errorHandler]);
router.delete('/:portfolioID', [cookieJwtAuth], [portfolioController.deletePortfolio, errorHandler]);
router.get('', portfolioController.getAllPortfolios);
router.get('/service', [portfolioController.getServicePortfoliosSortedByPrice, portfolioController.getServicePortfolios, errorHandler]);
router.get('/:portfolioID', [portfolioController.getPortfolio, errorHandler]);

module.exports = router;
class PortfolioController {
    constructor(
        portfolioRepo,
        clientErrors,
        portfolioValidator,
        nanoid
    ) {
        this.portfolioRepo = portfolioRepo;
        this.clientErrors = clientErrors;
        this.portfolioValidator = portfolioValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createPortfolio = async (req, res, next) => {
        try {
            let {
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.portfolioValidator.validateCreatePayload(req.body, ['serviceID'])
                // validate if serviceID exists
            await this.portfolioValidator.validateExistence(serviceID, 'service')

            let portfolioID = this.nanoid(14);

            await this.portfolioRepo.createPortfolio(
                portfolioID,
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            );

            let createdPortfolio = {
                ...req.body
            }
            createdPortfolio.portfolioID = portfolioID;

            res.status(201).json({
                message: "Portfolio created successfully",
                body: createdPortfolio
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:portfolioID"
    patchPortfolio = async (req, res, next) => {
        try {
            let {
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            } = req.body;

            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if portfolioID is not null
            this.portfolioValidator.checkRequiredParameters(req.params, ['portfolioID'])
                // validate if portfolioID exists
            await this.portfolioValidator.validateExistence(portfolioID, 'portfolio')
                // validate if not all fields are null
            this.portfolioValidator.validatePatchPayload(req.body);
                // validate if serviceID exists
            await this.portfolioValidator.validateExistence(serviceID, 'service')
            
            await this.portfolioRepo.patchPortfolio(
                portfolioID,
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            );

            let patchedPortfolio = {
                ...req.body
            }
            patchedPortfolio.portfolioID = portfolioID;

            res.status(200).json({
                message: `Portfolio ${portfolioID} patched successfully`,
                body: patchedPortfolio
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:portfolioID"
    deletePortfolio = async (req, res, next) => {
        try {
            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if portfolioID is not null
            this.portfolioValidator.checkRequiredParameters(req.params, ['portfolioID'])
                // validate if portfolioID exists
            await this.portfolioValidator.validateExistence(portfolioID, 'portfolio')
            
            await this.portfolioRepo.deletePortfolio(portfolioID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllPortfolios = async (req, res, next) => {
        try {
            let portfolios = await this.portfolioRepo.getAllPortfolios();

            res.status(200).json({
                message: "All portfolios retrieved successfully",
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/service?serviceID=&sortedByPrice="
    getServicePortfoliosSortedByPrice = async (req, res, next) => {
        try {
            let {serviceID, sortedByPrice} = req.query;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.portfolioValidator.checkRequiredQueryParameters(req.query, ['serviceID', 'sortedByPrice'])
                // validate if serviceID exists
            await this.portfolioValidator.validateExistence(serviceID, 'service')

            if (sortedByPrice == null) {
                return next();
            }

            let portfolios = undefined;

            if (sortedByPrice === "asc") {
                portfolios = await this.portfolioRepo.getServicePortfoliosSortedByPriceAsc(serviceID, sortedByPrice);
            } else if (sortedByPrice === "desc") {
                portfolios = await this.portfolioRepo.getServicePortfoliosSortedByPriceDesc(serviceID, sortedByPrice);
            }  else {
                throw new this.clientErrors.Api400Error("Invalid sortedByPrice query parameter value");
            }

            res.status(200).json({
                message: `Portfolios of service ${serviceID} sorted by price ${sortedByPrice} retrieved successfully`,
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            next();
        }
    };

    // GET: "/service?serviceID"
    getServicePortfolios = async (req, res, next) => {
        try {
            let {serviceID} = req.query;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.portfolioValidator.checkRequiredQueryParameters(req.query, ['serviceID'])
                // validate if serviceID exists
            await this.portfolioValidator.validateExistence(serviceID, 'service')
            
            let portfolios = await this.portfolioRepo.getServicePortfolios(serviceID);

            res.status(200).json({
                message: `Portfolios of service ${serviceID} retrieved successfully`,
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:portfolioID"
    getPortfolio = async (req, res, next) => {
        try {
            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if portfolioID is not null
            this.portfolioValidator.checkRequiredParameters(req.params, ['portfolioID'])
                // validate if portfolioID exists
            await this.portfolioValidator.validateExistence(portfolioID, 'portfolio')
            
            let portfolio = await this.portfolioRepo.getPortfolio(portfolioID);

            res.status(200).json({
                message: `Portfolio ${portfolioID} retrieved successfully`,
                body: portfolio
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = PortfolioController;
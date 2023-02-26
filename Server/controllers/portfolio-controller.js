class PortfolioController {
    constructor(
        portfolioRepo,
        clientErrors,
        serverErrors,
        portfolioValidator = null,
        nanoid
    ) {
        this.portfolioRepo = portfolioRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.portfolioValidator = portfolioValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createPortfolio = async (req, res) => {
        try {
            let {
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
                // validate if serviceID exists

            let portfolioID = this.nanoid.nanoid(14);

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
            console.log(error);
        }
    };

    // PATCH: "/:portfolioID"
    patchPortfolio = async (req, res) => {
        try {
            let {
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            } = req.body;

            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
                // validate if serviceID exists
                // validate if portfolioID is not null
                // validate if portfolioID exists
            
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
            console.log(error);
        }
    };

    // DELETE: "/:portfolioID"
    deletePortfolio = async (req, res) => {
        try {
            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if portfolioID is not null
                // validate if portfolioID exists
            
            await this.portfolioRepo.deletePortfolio(portfolioID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllPortfolios = async (req, res) => {
        try {
            let portfolios = await this.portfolioRepo.getAllPortfolios();

            res.status(200).json({
                message: "All portfolios retrieved successfully",
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/service?serviceID=&sortedByPrice="
    getServicePortfoliosSortedByPrice = async (req, res, next) => {
        try {
            let {serviceID, sortedByPrice} = req.query;

            // TODO: Pre-query validation
                // validate if serviceID is not null
                // validate if serviceID exists

            if (sortedByPrice == null) {
                next();
            }

            let portfolios = undefined;

            if (sortedByPrice === "asc") {
                portfolios = await this.portfolioRepo.getServicePortfoliosSortedByPriceAsc(serviceID, sortedByPrice);
            } else if (sortedByPrice === "desc") {
                portfolios = await this.portfolioRepo.getServicePortfoliosSortedByPriceDesc(serviceID, sortedByPrice);
            } 

            res.status(200).json({
                message: `Portfolios of service ${serviceID} sorted by price ${sortedByPrice} retrieved successfully`,
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/service?serviceID"
    getServicePortfolios = async (req, res) => {
        try {
            let {serviceID} = req.query;

            // TODO: Pre-query validation
                // validate if serviceID is not null
                // validate if serviceID exists
            
            let portfolios = await this.portfolioRepo.getServicePortfolios(serviceID);

            res.status(200).json({
                message: `Portfolios of service ${serviceID} retrieved successfully`,
                body: portfolios
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:portfolioID"
    getPortfolio = async (req, res) => {
        try {
            let {portfolioID} = req.params;

            // TODO: Pre-query validation
                // validate if portfolioID is not null
                // validate if portfolioID exists
            
            let portfolio = await this.portfolioRepo.getPortfolio(portfolioID);

            res.status(200).json({
                message: `Portfolio ${portfolioID} retrieved successfully`,
                body: portfolio
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = PortfolioController;
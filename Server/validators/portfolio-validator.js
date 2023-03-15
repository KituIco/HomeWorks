const Validator = require('./validator.js');

class PortfolioValidator extends Validator {
    constructor(
        clientErrors,
        portfolioRepo,
        serviceRepo
    ){
        super(clientErrors);
        this.portfolioRepo = portfolioRepo;
        this.serviceRepo = serviceRepo;
        this._rules = {
            portfolioID : {
                required: true,
                type: 'string'
            },
            serviceID : {
                required: true,
                type: 'string'
            },
            images : {
                required: false,
                type: 'string'
            },
            portfolioDescription: {
                required: false,
                type: 'string'
            },
            projectPrice : {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type === 'portfolio') {
            const portfolio = await this.portfolioRepo.getPortfolio(id);
            if (portfolio == null) {
                throw new this.clientErrors.Api404Error(`Portfolio with id ${id} does not exist`);
            }
        } else if (type === 'service') {
            const service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw new this.clientErrors.Api404Error(`Service with id ${id} does not exist`);
            }
        }
    }
}

module.exports = PortfolioValidator;
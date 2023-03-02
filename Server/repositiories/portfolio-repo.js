class PortfolioRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createPortfolio = async (
        portfolioID,
        serviceID,
        images,
        portfolioDescription,
        projectPrice
    ) => {
        try {
            let sqlQuery = `CALL create_portfolio(?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                portfolioID,
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    patchPortfolio = async (
        portfolioID,
        serviceID,
        images,
        portfolioDescription,
        projectPrice
    ) => {
        try {
            let sqlQuery = `CALL patch_portfolio(?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                portfolioID,
                serviceID,
                images,
                portfolioDescription,
                projectPrice
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    deletePortfolio = async (portfolioID) => {
        try {
            let sqlQuery = `CALL delete_portfolio(?)`;
            await this.db.query(sqlQuery, [portfolioID]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    getAllPortfolios = async () => {
        try {
            let sqlQuery = `CALL get_all_portfolios()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    getServicePortfolios = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_service_portfolios(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    getServicePortfoliosSortedByPriceAsc = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_service_portfolios_sorted_by_price_asc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    getServicePortfoliosSortedByPriceDesc = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_service_portfolios_sorted_by_price_desc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };

    getPortfolio = async (portfolioID) => {
        try {
            let sqlQuery = `CALL get_portfolio(?)`;
            let [result, _] = await this.db.query(sqlQuery, [portfolioID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
        }
    };
}

module.exports = PortfolioRepository;
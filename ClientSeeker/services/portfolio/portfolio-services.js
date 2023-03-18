import { getAxios } from '../../lib/axios';

let url = '/portfolio';

let PortfolioServices = {
    getAllPortfolios: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getServicePortfoliosSortedByPrice: async(serviceID, sortCondition) => {
        try {
            let queryURL = `${url}/service?serviceID=${serviceID}&sortedByPrice=${sortCondition}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getServicePortfolios: async(serviceID) => {
        try {
            let queryURL = `${url}/service?serviceID=${serviceID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getPortfolio: async(portfolioID) => {
        try {
            let queryURL = `${url}/${portfolioID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PortfolioServices;
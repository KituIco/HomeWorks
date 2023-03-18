import { patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/transaction-report';

let TransactionReportServices = {
    patchTransactionReport: async(reportID, data) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteTransactionReport: async(reportID) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReportsByKeywords: async(keyword) => {
        try {
            let queryURL = `${url}?keyword=${keyword}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReports: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReportsByProviderID: async(providerID) => {
        try {
            let queryURL = `${url}/provider/${providerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReportsByServiceID: async(serviceID) => {
        try {
            let queryURL = `${url}/service/${serviceID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReportsByStatusCode: async(statusID) => {
        try {
            let queryURL = `${url}/status/${statusID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getTransactionReportsByID: async(reportID) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionReportServices;
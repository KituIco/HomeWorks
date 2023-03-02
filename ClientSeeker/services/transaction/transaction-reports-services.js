import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/transaction-report';

let TransactionReportServices = {
    createTransactionReport: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchTransactionReport: async(reportID, data) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteTransactionReport: async(reportID) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getTransactionReportsByKeywords: async(keyword) => {
        try {
            let queryURL = `${url}?keyword=${keyword}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getTransactionReports: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getTransactionReportsBySeekerID: async(seekerID) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getTransactionReportsByStatusCode: async(statusID) => {
        try {
            let queryURL = `${url}/status/${statusID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getTransactionReportsByID: async(reportID) => {
        try {
            let queryURL = `${url}/${reportID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TransactionReportServices;
import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/adyen';
let AdyenServices = {
    getPaymentMethods: async () => {
        try {
            let queryURL = `${url}/payment-methods?cntryCode=PH&crncy=Php&val=0`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    makePayment: async (data) => {
        try {
            let queryURL = `${url}/payments?cntryCode=PH&crncy=Php&val=0`
            let res = await postAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    makePayout: async (data) => {
        try {
            let queryURL = `${url}/payout?&crncy=Php&val=0`
            let res = await postAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = AdyenServices;
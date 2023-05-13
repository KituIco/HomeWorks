import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/adyen';
let AdyenServices = {
    // createAddress: async (data = {}) => {
    //     try {
    //         let res = await postAxios(url, data);
    //         return res;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    getPaymentMethods: async () => {
        try {
            let queryURL = `${url}/payment-methods`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = AdyenServices;
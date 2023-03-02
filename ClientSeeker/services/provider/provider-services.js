import { getAxios } from '../../lib/axios';

let url = '/provider';

let ProviderServices = {
    getProviders: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getProvider: async(providerID) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProviderServices;
import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/provider';

let ProviderServices = {
    createProvider: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    
    checkProviderMail: async(data) => {
        try {
            let queryURL = `${url}/mail`;
            let res = await postAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchProvider: async(providerID, data) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteProvider: async(providerID) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProviders: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProvider: async(providerID) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProviderServices;
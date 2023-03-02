import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/provider';

let SeekerServices = {
    createProvider: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchProvider: async(providerID, data) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteProvider: async(providerID) => {
        try {
            let queryURL = `${url}/${providerID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

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

module.exports = SeekerServices;
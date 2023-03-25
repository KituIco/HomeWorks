import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/address';
let AddressServices = {
    createAddress: async (data = {}) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    patchAddress: async (addressID, data = {}) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    deleteAddress: async (addressID) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllAddress: async () => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllAddressOfUser: async (userID) => {
        try {
            let queryURL = `${url}/user/${userID}`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAddressByID: async (addressID) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllDefaultProviderAddress: async () => {
        try {
            let queryURL = `${url}/default/providers`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressServices;
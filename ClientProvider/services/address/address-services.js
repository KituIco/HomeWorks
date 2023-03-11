import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/address';
let AddressService = {
    createAddress: async (data = {}) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    patchAddress: async (addressID, data = {}) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    deleteAddress: async (addressID) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllAddress: async () => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllAddressOfUser: async (userID) => {
        try {
            let queryURL = `${url}/user/${userID}`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAddressByID: async (addressID) => {
        try {
            let queryURL = `${url}/${addressID}`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllDefaultSeekerAddress: async () => {
        try {
            let queryURL = `${url}/default/seekers`
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AddressService;
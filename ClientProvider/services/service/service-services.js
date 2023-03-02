import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/service';

let ServiceServices = {
    createService: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchService: async(serviceID, data) => {
        try {
            let queryURL = `${url}/${serviceID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteService: async(serviceID) => {
        try {
            let queryURL = `${url}/${serviceID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllServices: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getProviderServiceByKeyword: async(providerID, sortCondition = null, keyword) => {
        try {
            let queryURL = `${url}/provider/${providerID}?searchKey=${keyword}`;
            if (sortCondition != null) {
                queryURL = `${url}/provider/${providerID}?searchKey=${keyword}&sorted=${sortCondition}`;
            } 
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getProviderServicesSorted: async(providerID, sortCondition) => {
        try {
            let queryURL = `${url}/provider/${providerID}?sorted=${sortCondition}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getProviderServices: async(providerID) => {
        try {
            let queryURL = `${url}/provider/${providerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getService: async(serviceID) => {
        try {
            let queryURL = `${url}/${serviceID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ServiceServices;
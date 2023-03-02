import { getAxios } from '../../lib/axios';

let url = '/service';

let ServiceServices = {
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
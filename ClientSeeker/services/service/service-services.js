import { getAxios } from '../../lib/axios';

let url = '/service';

let ServiceServices = {
    getAllServices: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
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
            throw error;
        }
    },

    getProviderServicesSorted: async(providerID, sortCondition) => {
        try {
            let queryURL = `${url}/provider/${providerID}?sorted=${sortCondition}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProviderServices: async(providerID) => {
        try {
            let queryURL = `${url}/provider/${providerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getService: async(serviceID) => {
        try {
            let queryURL = `${url}/${serviceID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getServiceRecommendations: async(lat, lon, page, size) => {
        try {
            let queryURL = `${url}/recommended/?latitude=${lat}&longitude=${lon}&innerRadius=${0}&outerRadius=${0.125}&offsetMultiplier=${page}&sizeLimit=${size}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },
}

module.exports = ServiceServices;
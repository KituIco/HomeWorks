import { getAxios } from '../../lib/axios';

let url = '/service-specs';

let ServiceSpecsServices = {
    getAllServiceSpecs: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSortedSeekerSpecs: async(seekerID, sortCondition) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}?sorted=${sortCondition}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeekerSpecs: async(seekerID) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeekerSpecsByType: async(seekerID, typeID) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}/type/${typeID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeekerSpecsByStatus: async(seekerID, statusID) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}/status/${statusID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSpecsByType: async(typeID) => {
        try {
            let queryURL = `${url}/type/${typeID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSpecsByStatus: async(statusID) => {
        try {
            let queryURL = `${url}/status/${statusID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSpecsByID: async(specsID) => {
        try {
            let queryURL = `${url}/${specsID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ServiceSpecsServices;
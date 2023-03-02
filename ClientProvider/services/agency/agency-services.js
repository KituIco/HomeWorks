import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/agency';
let AgencyServices = {
    createAgency: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchAgency: async(agencyID, data) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await patchAxios(queryUrl, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteAgency: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await deleteAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAgencyById: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllAgency: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAgencyProviders: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/providers`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAgencyServiceTypes: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/service-types`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    addProviderToAgency: async(agencyID, providerID) => {
        try {
            let queryUrl = `${url}/${agencyID}/providers?${providerID}`;
            let res = await patchAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    removeProviderFromAgency: async(providerID) => {
        try {
            let queryUrl = `${url}/providers/${providerID}`;
            let res = await patchAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    searchProviderInAgency: async(agencyID, search) => {
        try {
            let queryUrl = `${url}/${agencyID}/search-name?searchQuery=${search}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = AgencyServices;
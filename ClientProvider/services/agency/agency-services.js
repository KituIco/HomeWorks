import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/agency';
let AgencyServices = {
    createAgency: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchAgency: async(agencyID, data) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await patchAxios(queryUrl, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteAgency: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await deleteAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAgencyById: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllAgency: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAgencyProviders: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/providers`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAgencyServiceTypes: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/service-types`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    addProviderToAgency: async(agencyID, providerID) => {
        try {
            let queryUrl = `${url}/${agencyID}/providers?${providerID}`;
            let res = await patchAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    removeProviderFromAgency: async(providerID) => {
        try {
            let queryUrl = `${url}/providers/${providerID}`;
            let res = await patchAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    searchProviderInAgency: async(agencyID, search) => {
        try {
            let queryUrl = `${url}/${agencyID}/search-name?searchQuery=${search}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = AgencyServices;
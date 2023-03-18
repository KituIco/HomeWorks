import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/certificate';

let CertificateServices = {
    createCertificate: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchCertificate: async(certificateID, data) => {
        try {
            let queryUrl = `${url}/${certificateID}`;
            let res = await patchAxios(queryUrl, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteCertificate: async(certificateID) => {
        try {
            let queryUrl = `${url}/${certificateID}`;
            let res = await deleteAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getCertificates: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProviderCertificates: async(providerID) => {
        try {
            let queryUrl = `${url}/provider/${providerID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getCertificateByID: async(certificateID) => {
        try {
            let queryUrl = `${url}/${certificateID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CertificateServices;
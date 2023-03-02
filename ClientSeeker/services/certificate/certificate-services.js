import { getAxios } from '../../lib/axios';

let url = '/certificate';

let CertificateServices = {
    getCertificates: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getProviderCertificates: async(providerID) => {
        try {
            let queryUrl = `${url}/provider/${providerID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getCertificateByID: async(certificateID) => {
        try {
            let queryUrl = `${url}/${certificateID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CertificateServices;
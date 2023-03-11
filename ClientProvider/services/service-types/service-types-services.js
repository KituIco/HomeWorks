import {getAxios} from '../../lib/axios';

const url = 'service-type';
let ServiceTypeServices = {
    getServiceTypes: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getServiceTypeById: async(typeID) => {
        try {
            let res = await getAxios(`${url}/${typeID}`);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = ServiceTypeServices;
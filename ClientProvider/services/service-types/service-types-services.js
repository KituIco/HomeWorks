import {getAxios} from '../../lib/axios';

const url = 'service-types';
let serviceTypeServices = {
    getServiceTypes: async() => {
        try {
            let res = await getAxios(url);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    getServiceTypeById: async(typeID) => {
        try {
            let res = await getAxios(`${url}/${typeID}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = serviceTypeServices;
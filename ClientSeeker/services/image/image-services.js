import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/upload';
let ImageService = {
    uploadFile: async (data = {}) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = ImageService;
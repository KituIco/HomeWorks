import { postAxios } from '../../lib/axios';

let url = '/upload';
let ImageService = {
    uploadFile: async (data) => {
        try {
            let res = await postAxios(url, data, true);
            return res.url;
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = ImageService;
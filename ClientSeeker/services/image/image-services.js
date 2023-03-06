import { postAxios } from '../../lib/axios';

let url = '/upload';
let ImageService = {
    uploadFile: async (data) => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('image', data);
            let res = await postAxios(url, bodyFormData, true);
            return res.url;
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = ImageService;
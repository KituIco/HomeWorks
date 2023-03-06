import { postAxios } from '../../lib/axios';
import * as fs from 'react-native-fs'

let url = '/upload';
let ImageService = {
    uploadFile: async (data) => {
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('image', fs.createReadStream(data));
            let res = await postAxios(url, bodyFormData, true);
            return res.url;
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = ImageService;
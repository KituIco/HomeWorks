import { postAxios } from '../../lib/axios';

let url = '/upload';
let ImageService = {
    uploadFile: async (data) => {
        try {
            if(!data) return "";

            var bodyFormData = new FormData();
            let file = data.split("/");
            let name = file[file.length-1];
            let type = `image/${name.split(".")[1]}`;

            bodyFormData.append('image',{
                uri: data,
                name: name,
                type: type,
            });
            let res = await postAxios(url, bodyFormData, true);
            return res.url;
        } catch (error) {
            throw error.message;
        }
    },

    uploadFiles: async (data) => {
        try {
            if(!data) return "";

            var bodyFormData = new FormData();
            for(let i=0; i<data.length; i++){
                let file = data[i].split("/");
                let name = file[file.length-1];
                let type = `image/${name.split(".")[1]}`;

                bodyFormData.append('images', {
                    uri: data[i],
                    name: name,
                    type: type,
                });
            }

            let res = await postAxios(`${url}/multiple/`, bodyFormData, true);
            return res.urls;
        } catch (error) {
            throw error.message;
        }
    },
    
}

module.exports = ImageService;
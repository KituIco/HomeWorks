import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/seeker';

let SeekerServices = {
    createSeeker: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchSeeker: async(seekerID, data) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteSeeker: async(seekerID) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeekers: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeeker: async(seekerID) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SeekerServices;
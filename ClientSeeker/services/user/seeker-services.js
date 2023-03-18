import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/seeker';

let SeekerServices = {
    createSeeker: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    
    checkSeekerMail: async(data) => {
        try {
            let queryURL = `${url}/mail`;
            let res = await postAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchSeeker: async(seekerID, data) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteSeeker: async(seekerID) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getSeekers: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getSeeker: async(seekerID) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SeekerServices;
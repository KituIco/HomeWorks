import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/message';

let MessageServices = {
    createMessage: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchMessage: async(messageID, data) => {
        try {
            let queryURL = `${url}/${messageID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deleteMessage: async(messageID) => {
        try {
            let queryURL = `${url}/${messageID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getMessages: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getBookingMessagesByKeyword: async(bookingID, keyword) => {
        try {
            let queryURL = `${url}/booking/${bookingID}?keyword=${keyword}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getBookingMessages: async(bookingID) => {
        try {
            let queryURL = `${url}/booking/${bookingID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getMessage: async(messageID) => {
        try {
            let queryURL = `${url}/${messageID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MessageServices;
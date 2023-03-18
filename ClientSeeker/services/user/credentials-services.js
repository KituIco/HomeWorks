import { postAxios, patchAxios, deleteAxios } from '../../lib/axios';
import * as SecureStore from 'expo-secure-store';

let url = '/credentials';

let CredentialsServices = {
    login: async (data) => {
        try {
            let queryURL = `${url}/login?userType=Seeker`;
            let res = await postAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            let queryURL = `${url}/logout`;
            let res = await deleteAxios(queryURL);
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchEmail: async (userID, data) => {
        try {
            let queryURL = `${url}/user/${userID}/email`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchPhoneNumber: async (userID, data) => {
        try {
            let queryURL = `${url}/user/${userID}/phone-number`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchPassword: async (userID, data) => {
        try {
            let queryURL = `${url}/user/${userID}/password`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getUserCredentials: async (userID) => {
        try {
            let queryURL = `${url}/user/${userID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CredentialsServices;
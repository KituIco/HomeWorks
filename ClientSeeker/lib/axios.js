import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';
var jwtDecode = require('jwt-decode');

const instance = axios.create({
    baseURL: `http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`
});

postAxios = async(url, data = {}, imageFile = null) => {
    try {
        let access_token = await SecureStore.getItemAsync('access_token');
        let refresh_token = await SecureStore.getItemAsync('refresh_token');

        let headers = {};

        if (access_token && refresh_token) {
            headers['Cookie'] = `access_token=${access_token}; refresh_token=${refresh_token}`;
        }
        
        if (imageFile) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        
        let res = await instance(
            {
                method: 'post',
                url: url,
                data: data,
                headers: headers
            }
        );

        let tokens = {}
        if(res.headers['set-cookie']){
            let cookie = res.headers['set-cookie'][0];
            let parsedToken = cookie.split(', ');
            parsedToken.forEach(
                (token) => {
                    let [key, value] = token.split('=');
                    if (key == 'access_token' || key == 'refresh_token') {
                        tokens[key] = value.split(';')[0];
                    }
                }
            )
        }

        console.log(tokens);

        if ('access_token' in tokens && 'refresh_token' in tokens) {
            let user = jwtDecode(tokens['access_token']);
            await SecureStore.setItemAsync('user', JSON.stringify(user));
            await SecureStore.setItemAsync('access_token', String(tokens['access_token']));
            await SecureStore.setItemAsync('refresh_token', String(tokens['refresh_token']));
        }
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

patchAxios = async(url, data = {}) => {
    try {
        let access_token = await SecureStore.getItemAsync('access_token');
        let refresh_token = await SecureStore.getItemAsync('refresh_token');
        let headers = {};

        if (access_token && refresh_token) {
            headers['Cookie'] = `access_token=${access_token}; refresh_token=${refresh_token}`;
        }

        let res = await instance(
            {
                method: 'patch',
                url: url,
                data: data,
                headers: headers
            }
        )
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

deleteAxios = async(url) => {
    try {
        let access_token = await SecureStore.getItemAsync('access_token');
        let refresh_token = await SecureStore.getItemAsync('refresh_token');
        let headers = {};

        if (access_token && refresh_token) {
            headers['Cookie'] = `access_token=${access_token}; refresh_token=${refresh_token}`;
        }

        let res = await instance(
            {
                method: 'delete',
                url: url,
                headers : headers
            }
        )
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

getAxios = async(url) => {
    try {
        let access_token = await SecureStore.getItemAsync('access_token');
        let refresh_token = await SecureStore.getItemAsync('refresh_token');
        let headers = {};

        if (access_token && refresh_token) {
            headers['Cookie'] = `access_token=${access_token}; refresh_token=${refresh_token}`;
        }

        let res = await instance(
            {
                method: 'get',
                url: url,
                headers : headers
            }
        )
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

putAxios = async(url, data = {}) => {
    try {
        let access_token = await SecureStore.getItemAsync('access_token');
        let refresh_token = await SecureStore.getItemAsync('refresh_token');
        let headers = {};

        if (access_token && refresh_token) {
            headers['Cookie'] = `access_token=${access_token}; refresh_token=${refresh_token}`;
        }

        let res = await instance(
            {
                method: 'put',
                url: url,
                data: data,
                headers : headers
            }
        )
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

module.exports = {
    postAxios,
    patchAxios,
    deleteAxios,
    getAxios,
    putAxios
}
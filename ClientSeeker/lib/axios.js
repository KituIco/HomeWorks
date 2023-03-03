import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: `http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`
});

postAxios = async(url, data = {}) => {
    try {
        let access_token = await AsyncStorage.getItem('access_token');
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        let res = await instance(
            {
                method: 'post',
                url: url,
                data: data,
                headers: {
                    Cookie: access_token && refresh_token && `access_token=${access_token}; refresh_token=${refresh_token}`
                }
            }
        )
        let tokens = {}
        res.headers['set-cookie'].forEach(
            async (cookie) => {
                let [key, value] = cookie.split('=');
                tokens[key] = value.split(';')[0];
            } 
        )
        await AsyncStorage.setItem('access_token', tokens['access_token']);
        await AsyncStorage.setItem('refresh_token', tokens['refresh_token']);
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
        let access_token = await AsyncStorage.getItem('access_token');
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        console.log(refresh_token)
        let res = await instance(
            {
                method: 'patch',
                url: url,
                data: data,
                headers: {
                    Cookie: access_token && refresh_token && `access_token=${access_token}; refresh_token=${refresh_token}`
                }
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
        let access_token = await AsyncStorage.getItem('access_token');
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        let res = await instance(
            {
                method: 'delete',
                url: url,
                headers : {
                    Cookie: access_token && refresh_token && `access_token=${access_token}; refresh_token=${refresh_token}`
                }
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
        let access_token = await AsyncStorage.getItem('access_token');
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        let res = await instance(
            {
                method: 'get',
                url: url,
                headers : {
                    Cookie: access_token && refresh_token && `access_token=${access_token}; refresh_token=${refresh_token}`
                }
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
        let access_token = await AsyncStorage.getItem('access_token');
        let refresh_token = await AsyncStorage.getItem('refresh_token');
        let res = await instance(
            {
                method: 'put',
                url: url,
                data: data,
                headers : {
                    Cookie: access_token && refresh_token && `access_token=${access_token}; refresh_token=${refresh_token}`
                }
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

expoGet = async(key) => {
    try {
        let value = await SecureStore.getItemAsync(key);
        return value;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postAxios,
    patchAxios,
    deleteAxios,
    getAxios,
    putAxios
}
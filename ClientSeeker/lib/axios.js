import axios from 'axios';
import {REACT_NATIVE_PACKAGER_HOSTNAME} from '@env';

const instance = axios.create({
    baseURL: `http://${REACT_NATIVE_PACKAGER_HOSTNAME}:3000`
});

postAxios = async(url, data = {}) => {
    try {
        console.log(REACT_NATIVE_PACKAGER_HOSTNAME)
        let res = await instance(
            {
                method: 'post',
                url: url,
                data: data
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

patchAxios = async(url, data = {}) => {
    try {
        let res = await instance(
            {
                method: 'patch',
                url: url,
                data: data
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
        let res = await instance(
            {
                method: 'delete',
                url: url
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
        let res = await instance(
            {
                method: 'get',
                url: url
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
        let res = await instance(
            {
                method: 'put',
                url: url,
                data: data
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
import axios from 'axios';
import store from '/src/store';
import Log from './Log.js';
// import router from '@/router';
import Util from './Util.js';
import Constants from './Constants.js';
import { handleSuccessfulLogin } from '/src/services/OnboardingServices.js';
// import router from '@/router';
axios.interceptors.request.use(
    (req) => {
        // if (!Util.tokenValid()) {
        //     refreshToken();
        // }
        //check if request url is excluded from auth paths
        const matchingExcludePaths = Constants.authExcludeApiPaths.filter((value) => {
            // make sure url is not null or undefined. If co convert to string type

            req.url = req.url || '';

            let excludePath = req.url.indexOf(value) > -1;

            return excludePath;
        });

        const setHeaders = () => {
            if (import.meta.env.VITE_BASE_URL && req.url?.startsWith(import.meta.env.VITE_BASE_URL)) {
                req.headers.Authorization = 'Bearer ' + store.getters['authToken/apiToken'];
            }
        };

        //check if url should not exclude authentication
        if (matchingExcludePaths.length === 0) {
            setHeaders();
        }

        return req;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // let refetchCount = 0
        const originalRequest = error?.config;

        if (String(error?.response?.status).charAt(0) == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await refreshToken();
            if (token) {
                originalRequest.headers['Authorization'] = 'Bearer ' + token.jwToken;
            }
            // else {
            //     refetchCount++;
            //     if(refetchCount <3){

            //     }
            // }
            return axios(originalRequest);
        }
        if (String(error?.response?.status).charAt(0) == 500 && !originalRequest._retry) {
            originalRequest._retry = true;

            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);
function refreshToken() {
    // return new Promise((resolve) => {
    return Web.post(
        Constants.API_BASE + '/Onboarding/refresh-token',
        {
            token: store.getters['authToken/refreshToken'],
        },
        (response) => {
            const data = response.data.data;
            // store.commit('authToken/apiToken', data.jwToken);
            // store.commit('authToken/refreshToken', data.refreshToken);
            handleSuccessfulLogin(data);

            return data;
        }
    );
    // });
}
export default class Web {
    static BASE_URL = import.meta.env.VITE_BASE_URL;

    static get(url, successCallback, errorCallback) {
        Web.getAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
    }

    static getAbsolute(url, successCallback, errorCallback) {
        axios.get(url).then(successCallback).catch(errorCallback);
    }

    static navigate(url) {
        window.location.href = url;
    }

    static post(url, data, successCallback, errorCallback) {
        Web.postAbsolute(Web.BASE_URL + url, data, successCallback, errorCallback);
    }

    // static postConfig(url, data, config, successCallback, errorCallback) {
    //     Web.postAbsolute(Web.BASE_URL + url, data, config, successCallback, errorCallback);
    // }

    static postAbsolute(url, data, successCallback, errorCallback) {
        axios.post(url, data).then(successCallback).catch(errorCallback);
    }

    static deleteData(url, data, successCallback, errorCallback) {
        Web.deleteDataAbsolute(Web.BASE_URL + url, data, successCallback, errorCallback);
    }

    static deleteDataAbsolute(url, data, successCallback, errorCallback) {
        axios.delete(url, data).then(successCallback).catch(errorCallback);
    }

    static postRefreshToken(url, data, refreshToken, successCallback, errorCallback) {
        axios
            .post(Web.BASE_URL + url, data, {
                headers: {
                    refreshToken: refreshToken,
                    // 'Authorization': "Bearer" + " " + jwToken
                },
            })
            .then(successCallback)
            .catch(errorCallback);
    }

    static put(url, data, successCallback, errorCallback) {
        Web.putAbsolute(Web.BASE_URL + url, data, successCallback, errorCallback);
    }

    static putAbsolute(url, data, successCallback, errorCallback) {
        axios.put(url, data).then(successCallback).catch(errorCallback);
    }

    static delete(url, successCallback, errorCallback) {
        Web.deleteAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
    }

    static deleteAbsolute(url, successCallback, errorCallback) {
        axios.delete(url).then(successCallback).catch(errorCallback);
    }

    static patch(url, successCallback, errorCallback) {
        Web.patchAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
    }

    static patchAbsolute(url, successCallback, errorCallback) {
        axios.patch(url).then(successCallback).catch(errorCallback);
    }
}

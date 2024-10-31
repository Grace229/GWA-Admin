import store from '/src/store';
import Log from './Log.js';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

export default class Util {
    static exportToExcel = (data) => {
        // const data = [
        //     {
        //         id: '6987068c-5a25-470d-bf1f-a38022b7f7da',
        //         businessName: 'Benmat Limited',
        //         firstName: 'Ben',
        //         lastName: 'Mat',
        //         fullName: null,
        //         email: 'benmatta@maildrop.cc',
        //         phoneCode: '+234',
        //         phoneNumber: '8059139698',
        //         address: 'warr',
        //         state: 'Delta',
        //         safCurrentAccountNumber: null,
        //         termsAcceptedAt: '2023-05-24T12:56:07.496418Z',
        //         userId: '673d90af-67d3-42d4-9844-74b19eabbf83',
        //         onboardingStatus: 0,
        //         profileStatus: 0,
        //         comment: '',
        //         dateRejected: null,
        //     },
        //     // ... add the remaining data objects here
        // ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        this.saveAsExcelFile(excelBuffer, 'data_export');
    };

    static saveAsExcelFile = (buffer, fileName) => {
        const data = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(data);
        link.download = `${fileName}.xlsx`;
        link.click();
    };
    static formatDatePicked = (inputDate) => {
        const dateObj = new Date(inputDate);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    // static name = 'UUtil';
    static getParamByName = (paramName, paramsArray) => {
        if (paramsArray?.length > 0) {
            const foundParam = paramsArray.find((param) => param.parameter == paramName);

            return foundParam?.value;
        }
    };

    static getFileExtension(filename) {
        return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    }

    static findRoute = (routes, property, value) => {
        const self = this;
        for (let route of routes) {
            if (route[property] === value) {
                return route;
            }
            if (route.children) {
                let childMatch = self.findRoute(route.children, property, value);
                if (childMatch) {
                    return childMatch;
                }
            }
        }
        return null;
    };
    static dateFormat = (date) => {
        return moment(date, 'YYYY-MM-DD HH:mm:ss.SSSS').format('DD/MM/YYYY');
    };
    static formatTime(time, inputFormat, outputFormat) {
        return moment(time, inputFormat).format(outputFormat);
    }

    static getIdFromName = (name, arr) => {
        if (arr?.length > 0) {
            const id = arr.find((item) => item.name === name).id;
            return id;
        } else {
            return '';
        }
    };
    static getYearsList() {
        // Get the current year
        let currentYear = new Date().getFullYear();

        // Create an empty array to store the years
        let yearList = [];

        // Loop through a range of years, starting from 1900 to the current year
        for (let year = 1960; year <= currentYear; year++) {
            yearList.push({
                id: year,
                text1: String(year),
            });
        }

        // Print the list of years
        // console.log(yearList);

        return yearList;
    }
    static parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse('tokenJson' + jsonPayload);
    }
    static tokenValid() {
        const token = store.getters['authToken/apiToken'];

        try {
            const decoded = jwt_decode(token);
            // console.log('decoded: ' + JSON.stringify(decoded));
            const { exp } = decoded;
            // console.log(`${Date.now()} => ${exp * 1000}`);
            // console.log(`isExpired = ${Date.now() >= exp * 1000}`);
            if (Date.now() >= exp * 1000) {
                return false;
            }
        } catch (err) {
            // console.log('tokenErr:' + err);
            return false;
            // JWT is invalid, handle the error
        }

        return true;
    }

    static checkAuth(arr) {
        const roles = store.getters['authToken/roles'];

        const bool = roles.some((v) => arr.includes(v));

        return bool;
    }

    static checkAdminAuth() {
        return store.getters['authToken/roles'].includes('SuperAdmin');
    }

    static checkIndividualAuth() {
        return store.getters['authToken/roles'].includes('Individual');
    }

    static checkVendorAuth() {
        return store.getters['authToken/roles'].includes('Vendor');
    }
    static handleGlobalAlert = (show, type, text) => {
        // console.log('Alert');
        if (text === null || text === undefined || text === '') {
            text = 'Unknown Error';
        }
        store.commit('setGlobalAlert', { show: show, type: type, text: text });
        // console.log('Alert Params:' + `${show} , ${type}, ${text}`);
    };

    static hasLowerCase(str) {
        return /[a-z]/.test(str);
    }

    static hasUpperCase(str) {
        return /[A-Z]/.test(str);
    }

    static hasMinEightCharacters(str) {
        return str.length >= 8;
    }

    static containsNumbers(str) {
        return /\d/.test(str);
    }

    static hasSpecialChar(str) {
        return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    }

    static isValidString(str, empty = false) {
        return typeof str === 'string' && (!empty ? !!str && !!str.length : true);
    }

    static throttle(t) {
        if (Util.throttleObject[t.key]) {
            Util.throttleObject[t.key].exec = false;
        }

        Util.throttleObject[t.key] = t;
        t.exec = true;

        setTimeout(() => {
            if (t.exec) {
                if (Util.isValidFunction(t.func)) {
                    t.func();
                } else if (Util.isValidFunction(t.run)) {
                    t.run();
                }
            }
        }, t.time || 1000);
    }
}

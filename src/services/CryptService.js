// const CryptoJS = require('crypto-js');
import { Util } from '@/util';
import CryptoJS from 'crypto-js';
// export function encryptData(pvtData) {
//     // alert(import.meta.env.VITE_APP_CRYPTO_KEY);
//     var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);
//     var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);

//     var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pvtData), key, {
//         keySize: 128,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//     }).toString();
//     return encrypted;
// }

// export function decryptData(pvtData) {
//     var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);
//     var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);

//     // decrypt the data and convert to string
//     const decryptData = CryptoJS.AES.decrypt(pvtData, key, {
//         keySize: 128,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//     }).toString(CryptoJS.enc.Utf8);
//     return decryptData;
// }

export function encryptData(pvtData) {
    // alert(import.meta.env.VITE_APP_CRYPTO_KEY);
   
    try {
        var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);
        var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse( decryptData(pvtData)), key, {
            // keySize: 128,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
        return encrypted != undefined && encrypted != '' ? encrypted : pvtData;
    } catch (e) {
        return pvtData;
    }
}

export function decryptData(pvtData) {
    try {
        var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);
        var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_CRYPTO_KEY);

        // decrypt the data and convert to string
        const decryptData = CryptoJS.AES.decrypt(pvtData, key, {
            // keySize: 128,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
        return decryptData != undefined && decryptData != '' ? decryptData : pvtData;
    } catch (e) {
        return pvtData;
    }
}

// store/index.js
import { createStore } from 'vuex';
import stack from './modules/stack';
import authToken from './modules/authToken';
import marketPlace from './modules/marketPlace.js';
import vendor from './modules/vendor.js';
import createPersistedState from 'vuex-persistedstate';
import admin from './modules/admin.js';
let timer;
const store = createStore({
    state: {
        globalAlert: { show: false, type: '', text: '' },
        vendorSignupDetails: {},
        redirectedFrom: '',
        isLoggedIn: false,
        vendorInfo: { name: 'Null' },
    },
    mutations: {
        setGlobalAlert(state, payload) {
            // Clear previous timer
            clearTimeout(timer);
            // update alert state
            state.globalAlert = payload;
            // set new timer
            timer = setTimeout(() => {
                const alert = document.getElementById('globalAlert');
                state.globalAlert = { show: false, type: '', text: '' };
                if (payload.show === true) {
                    // console.log('ClickedAlert');
                    alert.click();
                }
            }, 5000);
        },
        setVendorSignupDetails(state, payload) {
            state.vendorSignupDetails = payload;
        },
        setRedirectedFrom(state, payload) {
            state.redirectedFrom = payload;
        },
        setIsLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        },
        setVendorInfo(state, payload) {
            state.vendorInfo = payload;
        },
    },
    modules: {
        stack,
        authToken,
        vendor,
        marketPlace,
        admin,
    },
    plugins: [createPersistedState()],
});

export default store;

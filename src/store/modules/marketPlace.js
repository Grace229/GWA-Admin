import { Log, Web, Constants, Util } from '/src/util';
import store from '/src/store';
// import jwt from 'jsonwebtoken';

const state = {
    paymentResponse: {},
    upgradeResponse: {},
    upgraded: false,
};

const getters = {
    paymentResponse(state) {
        return state.paymentResponse;
    },
    upgradeResponse(state) {
        return state.upgradeResponse;
    },
    upgraded(state) {
        return state.upgraded;
    },
};

const mutations = {
    paymentResponse(state, paymentResponse) {
        state.paymentResponse = paymentResponse;
    },

    upgradeResponse(state, upgradeResponse) {
        state.upgradeResponse = upgradeResponse;
    },
    upgraded(state, upgraded) {
        state.upgraded = upgraded;
    },
};

const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

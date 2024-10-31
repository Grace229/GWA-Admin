import { Log, Web, Constants, Util } from '/src/util';
import store from '/src/store';
// import jwt from 'jsonwebtoken';

const state = {
    pickedOrder: null,
};

const getters = {
    pickedOrder(state) {
        return state.pickedOrder;
    },
};

const mutations = {
    pickedOrder(state, pickedOrder) {
        state.pickedOrder = pickedOrder;
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

import { Log, Web, Constants, Util } from '/src/util';
import store from '/src/store';

const state = {
    savedCar: null,
    pickedOrder: null,
};

const getters = {
    savedCar(state) {
        return state.savedCar;
    },
    pickedOrder(state) {
        return state.pickedOrder;
    },
};

const mutations = {
    savedCar(state, savedCar) {
        state.savedCar = savedCar;
    },
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

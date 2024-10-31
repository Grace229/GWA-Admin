
import store from '@/store';
import { Log, Web, Util } from '@/util';

const authRoute = async (to, from, next) => {
    if (store.getters['authToken/loggedIn']) {

        if (to.meta?.auth) {
            if (Util.checkAuth(to.meta.auth)) {
                navigatePath(to, from, next);
            } else {
                navigatePath(to, from, next);
            }
            return;
        }

        navigatePath(to, from, next);
    } else {
        navigateLogin(to, next);
    }
};

// const navigateLogin = (to, next) => {
//   store.commit("entryUrl", to.path);
//   Web.navigate("/login");
// };
const navigateLogin = (to, next) => {
    store.commit('entryUrl', to.path);
    next({ name: 'Login' });
};

const navigateHome = (to, next) => {
    store.commit('entryUrl', to.path);
    Web.navigate('/');
};

const navigatePath = (to, from, next) => {
    const url = store.getters.entryUrl;
    const authorizations = store.getters['authToken/roles'];

    if (to.meta?.auth && to.meta.auth.length > 0) {
        if (!authorizations.some((auth) => to.meta.auth.includes(auth))) {
            navigateHome(to, next);
            return;
        }
    }

    if (Util.isValidString(url)) {
        next(url);
        store.commit('entryUrl', null);
    } else {
        next();
    }
};

export default function (to, from, next) {
    if (to.matched.some((record) => record.meta.skipAuth)) {
        next();
        return;
    }

    authRoute(to, from, next);
}
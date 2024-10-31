import { Web, Constants, Log } from '/src/util';
import { withRetryHandling } from '/src/util/retry-handling.js';



import store from '/src/store/index.js';
// import { Log } from "@/components/util";
export const refreshToken = () => {
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
};

export const individualSignup = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/individual/signup', data, successHandler, errorHandler);
};

export const forgotPassword = withRetryHandling((data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Onboarding/forgot-password', data, successHandler, errorHandler);
});

export const resetPassword = withRetryHandling((data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Onboarding/reset-password', data, successHandler, errorHandler);
});

export const signin = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/auth/login', data, successHandler, errorHandler);
};
export const signout = (data,successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/signout', data, successHandler, errorHandler);
};
export const sendOtpSMS = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/send-sms-otp', data, successHandler, errorHandler);
};

export const validateOtp = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/validate-onetoken', data, successHandler, errorHandler);
};

export const sendOtpEmail = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/send-email-otp', data, successHandler, errorHandler);
};

export const updateProfile = (data, successHandler, errorHandler) => {
    Web.put(Constants.API_BASE + '/Profiles/update-profile', data, successHandler, errorHandler);
};
//vendor
export const vendorSignup = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/sign-up', data, successHandler, errorHandler);
};

export const vendorSave = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/save', data, successHandler, errorHandler);
};

export const resendVendorOtpSMS = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/resend-phone-otp', data, successHandler, errorHandler);
};

export const validateVendorOtpSMS = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/validate-phone-otp', data, successHandler, errorHandler);
};

export const resendEmailVerificationLink = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/resend-email-verification-link', data, successHandler, errorHandler);
};

export const vendorCreatePassword = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/create-password', data, successHandler, errorHandler);
};

export const vendorConfirmEmail = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/vendor/confirm-email', data, successHandler, errorHandler);
};

export const handleSuccessfulLogin = (response) => {
    const data = response;

    
    store.commit('authToken/isEmailVerified', data.user.confirmed);
    store.commit('authToken/apiToken', data.access_token ? data.access_token : null);
    store.commit('authToken/State', data.user.state ? data.user.state : null);
    store.commit('authToken/userId', data.user.id);
    store.commit('authToken/email', data.user.email);
    store.commit('authToken/roles', data.user.roles[0].roleId.name);
    store.commit('authToken/status', data.user.status);
    store.commit('authToken/googleId', data.user.googleId);
    store.commit('authToken/photo', data.user.ProfilePicture);
    store.commit('authToken/fullName', data.user.fullName);
    store.commit('authToken/isSuperAdmin', data.user.isSuperAdmin);
    store.commit('authToken/phoneNumber', data.user.phoneNumber ? data.user.phoneNumber : '');
    store.commit('authToken/address', data.user.address);
};

export const handleLogout = (reason = null, route = null) => {
    if (reason === 'auto') {
        // Web.navigate('/login');
    } else {
        // Web.navigate('/login');
    } 
};

export const clearStorage = () => {
    localStorage.clear();
};

export const changePassword = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/change-password', data, successHandler, errorHandler);
};

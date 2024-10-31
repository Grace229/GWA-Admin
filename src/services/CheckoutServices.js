import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';

export const upfrontAmount = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/upfront-amount', data, successHandler, errorHandler);
};

export const checkoutFees = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + '/Checkout/fees', successHandler, errorHandler);
};

export const verifyBvn = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/bvn-verify', data, successHandler, errorHandler);
};

export const checkoutBuy = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/buy', data, successHandler, errorHandler);
};

export const checkoutLease = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/lease', data, successHandler, errorHandler);
};

export const checkoutRent = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/rent', data, successHandler, errorHandler);
};

export const checkoutEstimate = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/estimate-check', data, successHandler, errorHandler);
};
export const checkoutEstimatePercent = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/estimate', data, successHandler, errorHandler);
};

export const creditCheck = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/credit-check', data, successHandler, errorHandler);
};

export const upfrontRent = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/upfront-rent-amount', data, successHandler, errorHandler);
};

export const upfrontLease = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/upfront-lease-amount', data, successHandler, errorHandler);
};

export const updateInspectionreport = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/update-inspectionreport', data, successHandler, errorHandler);
};

export const updateContractStatus = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/update-contractstatus', data, successHandler, errorHandler);
};

export const getCheckoutContract = (orderId, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Checkout/contract?OrderId=${orderId}`, successHandler, errorHandler);
};

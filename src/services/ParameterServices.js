import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';

export const getAllParameters = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Parameters/get-all`, successHandler, errorHandler);
};

export const createParamValue = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Parameters/create-parametervalue', data, successHandler, errorHandler);
};

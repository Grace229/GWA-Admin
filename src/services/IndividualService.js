import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';

export const getProfile = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + '/Profiles/info', successHandler, errorHandler);
};

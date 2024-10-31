import { Web, Constants } from '/src/util';

// export const individualSignup = (data, successHandler, errorHandler) => {
//     Web.post(Constants.API_BASE + '/Onboarding/individual/signup', data, successHandler, errorHandler);
// };

export const getAllCars = (
    { searchText, userId, leastAmount, highestAmount, brandId, modelId, location, leastYear, highestYear, conditions, financeOption, pageNumber, pageSize },
    successHandler,
    errorHandler
) => {
    return Web.get(
        Constants.API_BASE +
            `/Market/get-vehicles?Descending=${false}&SearchText=${searchText}${userId}&LeastAmount=${leastAmount}&HighestAmount=${highestAmount}&BrandId=${brandId}&ModelId=${modelId}&Location=${location}&LeastYear=${leastYear}&HighestYear=${highestYear}&Conditions=${conditions}&FinanceOption=${financeOption}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const getAllBrands = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Brands/get-all`, successHandler, errorHandler);
};

export const getBrandModels = (brandId, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Market/get-models?BrandId=${brandId}`, successHandler, errorHandler);
};

export const getBanks = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Banks/get-all`, successHandler, errorHandler);
};

export const getNotifications = ({ pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Notification?PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};
export const markNotificationAsRead = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Notification/markasread', data, successHandler, errorHandler);
};

export const markAllNotificationsAsRead = (successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Notification/markallasread', {}, successHandler, errorHandler);
};

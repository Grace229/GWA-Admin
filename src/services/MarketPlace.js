import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';

import store from '/src/store/index.js';

export const individualSignup = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Onboarding/individual/signup', data, successHandler, errorHandler);
};

export const getVehicleById = (id, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Market/${id}/get`, successHandler, errorHandler);
};

export const getVehicleByUserId = ({ id, userId }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Market/${id}/get?userId=${userId}`, successHandler, errorHandler);
};

export const getAllCars = (
    { sortBy, descending, minMileage, maxMileage, searchText, leastAmount, highestAmount, brandId, modelId, location, leastYear, highestYear, conditions, financeOption, pageNumber, pageSize },
    successHandler,
    errorHandler
) => {
    return Web.get(
        Constants.API_BASE +
            `/Market/get-vehicles?SortBy=${sortBy}&Descending=${descending}&SearchText=${searchText}&LeastAmount=${leastAmount}&HighestAmount=${highestAmount}&MinMileage=${minMileage}&MaxMileage=${maxMileage}&BrandId=${brandId}&ModelId=${modelId}&Location=${location}&LeastYear=${leastYear}&HighestYear=${highestYear}&Conditions=${conditions}&FinanceOption=${financeOption}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const searchAllCars = (
    { sortBy, userId, descending, minMileage, maxMileage, searchText, leastAmount, highestAmount, brandId, modelId, location, leastYear, highestYear, conditions, financeOption, pageNumber, pageSize },
    successHandler,
    errorHandler
) => {
    return Web.get(
        Constants.API_BASE +
            `/Market/get-vehicles?SortBy=${sortBy}${userId}&Descending=${descending}&SearchText=${searchText}&LeastAmount=${leastAmount}&HighestAmount=${highestAmount}&MinMileage=${minMileage}&MaxMileage=${maxMileage}&BrandId=${brandId}&ModelId=${modelId}&Location=${location}&LeastYear=${leastYear}&HighestYear=${highestYear}${conditions}&FinanceOption=${financeOption}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const createBrand = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Brands/create', data, successHandler, errorHandler);
};

export const createModel = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/VehicleModels/create', data, successHandler, errorHandler);
};

export const likeCar = (data, successHandler, errorHandler) => {
    Web.post(Constants.API_BASE + '/Market/like', data, successHandler, errorHandler);
};

export const unlikeCar = (data, successHandler, errorHandler) => {
    Web.put(Constants.API_BASE + '/Market/removelike', data, successHandler, errorHandler);
};

export const getAllLikedCars = ({ userId, descending, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Market/liked-vehicles?UserId=${userId}&Descending=${descending}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};

// /Market/7618092c-9e83-4602-bfbe-d3742e24ea5b/get

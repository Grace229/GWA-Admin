import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';
export const getStats = ({ userId, from, to }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Dashboard/get-stats?UserId=${userId}&From=${from}&To=${to}`, successHandler, errorHandler);
};
export const getSalesChart = ({ userId, from, to }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Dashboard/get-saleschart?UserId=${userId}&From=${from}&To=${to}`, successHandler, errorHandler);
};

export const fakeUpload = (data, successHandler, errorHandler) => {
    Web.postAbsolute('https://httpbin.org/post', data, successHandler, errorHandler);
};

export const updateVendorProfile = (data, successHandler, errorHandler) => {
    return Web.put(Constants.API_BASE + '/Profiles/vendor-profile', data, successHandler, errorHandler);
};

export const getVendorProfile = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + '/Profiles/vendor/info', successHandler, errorHandler);
};

export const uploadVehicle = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Vehicles/uploadphoto', data, successHandler, errorHandler);
};

export const getAllBrands = (userId, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Brands/get-all?UserId=${userId}`, successHandler, errorHandler);
};

export const getAllCarBrands = (userId, pageNumber, pageSize, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Brands/get-all?UserId=${userId}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};

export const getBrandModels = (brandId, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Market/get-models?BrandId=${brandId}`, successHandler, errorHandler);
};

export const getAllFeatures = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + '/Features/get-all', successHandler, errorHandler);
};

export const createVehicle = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Vehicles/create', data, successHandler, errorHandler);
};

export const getVehicle = (vehicleId, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Vehicles/${vehicleId}/get`, successHandler, errorHandler);
};

export const editVehicle = (data, successHandler, errorHandler) => {
    return Web.put(Constants.API_BASE + '/Vehicles/update', data, successHandler, errorHandler);
};

export const getCars = ({ userId, sortBy, descending, searchText, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE + `/Vehicles/get-all?VendorId=${userId}&SortBy=${sortBy}&Descending=${descending}&SearchText=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const getDashboardVehicles = ({ userId, sortBy, status, descending, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE + `/Vehicles/get-all?VendorId=${userId}&SortBy=${sortBy}&Descending=${descending}&Status=${status}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const submitVehicle = (data, successHandler, errorHandler) => {
    return Web.put(Constants.API_BASE + '/Vehicles/setaspending', data, successHandler, errorHandler);
};

export const getRejectedCars = ({ userId, sortBy, status, descending, searchText, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE + `/Vehicles/get-all?VendorId=${userId}&SortBy=${sortBy}&Descending=${descending}&Status=${status}&SearchText=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const getOrderedCars = ({ userId, orderType, descending, searchText, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE + `/Orders/vendor/get-all?VendorId=${userId}&Descending=${descending}&SearchText=${searchText}&OrderType=${orderType}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

// export const getAllParameters = (successHandler, errorHandler) => {
//     return Web.get(Constants.API_BASE + `/Parameters/get-all`, successHandler, errorHandler);
// };

// export const createParamValue = (data, successHandler, errorHandler) => {
//     return Web.post(Constants.API_BASE + '/Parameters/create-parametervalue', data, successHandler, errorHandler);
// };

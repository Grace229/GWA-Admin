import { Web, Constants } from '/src/util';
// import { withRetryHandling } from '/src/util/retry-handling.js';

export const upfrontAmount = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + '/Checkout/upfront-amount', data, successHandler, errorHandler);
};

export const getAllCustomers = ({ sortBy, descending, searchText, profileStatusString, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.ADMIN_API_BASE + `/Individuals/get-all?SortBy=${sortBy}&Descending=${descending}&SearchText=${searchText}&${profileStatusString}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const updateCustomerProfile = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + '/Individuals/update-profilestatus', data, successHandler, errorHandler);
};

export const getAllVendors = ( successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE +
            `/users`,
        successHandler,
        errorHandler
    );
};

export const getVendor = (id, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/users/${id}`, successHandler, errorHandler);
};

export const vendorApproveOrDecline = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + '/Vendor/update-onboardingstatus', data, successHandler, errorHandler);
};

export const vendorProfileStatusUpdate = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + '/Vendor/update-profilestatus', data, successHandler, errorHandler);
};

export const getAllOrders = ({ location, descending, searchText, orderSort, orderType, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.ADMIN_API_BASE +
            `/Orders/get-all?Descending=${descending}${
                location ? '&Location=' + location : ''
            }&SearchText=${searchText}&OrderSort=${orderSort}&OrderType=${orderType}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const markAsPaid = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + '/Orders/markaspayed', data, successHandler, errorHandler);
};

export const getVehicleById = (id, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Vehicles/${id}/get`, successHandler, errorHandler);
};

export const getFees = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/subscriptions`, successHandler, errorHandler);
};

export const updateFee = ({ id },data, successHandler, errorHandler) => {
    return Web.patch(Constants.API_BASE + `/subscriptions/${id}`, data, successHandler, errorHandler);
};

export const addFee = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/subscriptions`, data, successHandler, errorHandler);
};

export const deleteFee = ({ id }, successHandler, errorHandler) => {
    return Web.delete(Constants.ADMIN_API_BASE + `/Fees/delete?Id=${id}`, successHandler, errorHandler);
};

export const getParams = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Parameters/get-all`, successHandler, errorHandler);
};

export const addParam = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/Parameters/create`, data, successHandler, errorHandler);
};

export const updateParam = (data, successHandler, errorHandler) => {
    return Web.put(Constants.API_BASE + `/Parameters/update`, data, successHandler, errorHandler);
};

export const deleteParam = ({ parameterId, permanent }, successHandler, errorHandler) => {
    return Web.delete(Constants.API_BASE + `/Parameters/delete?ParameterId=${parameterId}&Permanent=${permanent}`, successHandler, errorHandler);
};

export const getFeatures = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Features/get-all`, successHandler, errorHandler);
};

export const addFeature = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/Features/create`, data, successHandler, errorHandler);
};

export const updateFeature = (data, successHandler, errorHandler) => {
    return Web.put(Constants.API_BASE + `/Features/update`, data, successHandler, errorHandler);
};

export const deleteFeature = ({ featureId, permanent }, successHandler, errorHandler) => {
    return Web.delete(Constants.API_BASE + `/Features/delete?FeatureId=${featureId}&Permanent=${permanent}`, successHandler, errorHandler);
};

export const getVehicles = (
    { sortBy, descending, minMileage, maxMileage, searchText, leastAmount, highestAmount, brandId, modelId, location, leastYear, highestYear, conditions, financeOption, pageNumber, pageSize },
    successHandler,
    errorHandler
) => {
    return Web.get(
        Constants.API_BASE +
            `/Vehicles/get-all?SortBy=${sortBy}&Descending=${descending}&SearchText=${searchText}&LeastAmount=${leastAmount}&HighestAmount=${highestAmount}&MinMileage=${minMileage}&MaxMileage=${maxMileage}&BrandId=${brandId}&ModelId=${modelId}&Location=${location}&LeastYear=${leastYear}&HighestYear=${highestYear}${conditions}&FinanceOption=${financeOption}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};
//
export const getCommissions = (successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/addons`, successHandler, errorHandler);
};

export const updateCommission = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + `/Commission/update`, data, successHandler, errorHandler);
};

export const addCommission = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/addons`, data, successHandler, errorHandler);
};

export const deleteCommission = ({ id }, successHandler, errorHandler) => {
    return Web.delete(Constants.ADMIN_API_BASE + `/Commission/delete?Id=${id}`, successHandler, errorHandler);
};

// export const getProducts = (
//     { sortBy, descending, minMileage, maxMileage, searchText, leastAmount, highestAmount, brandId, modelId, location, leastYear, highestYear, conditions, financeOption, pageNumber, pageSize },
//     successHandler,
//     errorHandler
// ) => {
//     return Web.get(
//         Constants.ADMIN_API_BASE +
//             `/Product/get-all?SortBy=${sortBy}&Descending=${descending}&SearchText=${searchText}&LeastAmount=${leastAmount}&HighestAmount=${highestAmount}&MinMileage=${minMileage}&MaxMileage=${maxMileage}&BrandId=${brandId}&ModelId=${modelId}&Location=${location}&LeastYear=${leastYear}&HighestYear=${highestYear}${conditions}&FinanceOption=${financeOption}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
//         successHandler,
//         errorHandler
//     );
// };

export const getProducts = ({ descending, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Product/get-all?Descending=${descending}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};

export const updateProductStatus = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + `/Product/approval`, data, successHandler, errorHandler);
};

export const editProduct = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + '/Product/update', data, successHandler, errorHandler);
};

export const getProduct = (id, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Product/${id}/get`, successHandler, errorHandler);
};

export const getAuditLogs = ({ descending, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Audit?Descending=${descending}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};

export const approveOrder = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Orders/approve`, data, successHandler, errorHandler);
};

export const markOrderAsDelivered = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Orders/markasdelivered`, data, successHandler, errorHandler);
};

export const rejectOrder = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Orders/reject`, data, successHandler, errorHandler);
};

export const getVendorStats = (id, userId, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Vendor/stats?Id=${id}&userId=${userId}`, successHandler, errorHandler);
};

export const uploadOrderDoc = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Orders/uploadorder-document`, data, successHandler, errorHandler);
};

export const getOrderDocs = ({ orderId }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Orders/order-documents?OrderId=${orderId}`, successHandler, errorHandler);
};

export const getCustomer = (id, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Individuals/getbyId/${id}`, successHandler, errorHandler);
};

export const getOrderDetails = (id, successHandler, errorHandler) => {
    return Web.get(
        Constants.ADMIN_API_BASE +
            `/Orders/get-orderdetails?OrderId=${id}
    `,
        successHandler,
        errorHandler
    );
};

export const createAdmin = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Users/Create`, data, successHandler, errorHandler);
};

export const editAdmin = (data, successHandler, errorHandler) => {
    return Web.post(Constants.ADMIN_API_BASE + `/Users/Edit`, data, successHandler, errorHandler);
};

export const getAdminUsers = ({ adminOnly, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/Users/get-all?AdminOnly=${adminOnly}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
};

export const deleteUser = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + `/Users/delete-user`, data, successHandler, errorHandler);
};

export const disableUser = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + `/Users/disable-user`, data, successHandler, errorHandler);
};

export const enableUser = (data, successHandler, errorHandler) => {
    return Web.put(Constants.ADMIN_API_BASE + `/Users/enable-user`, data, successHandler, errorHandler);
};

export const getAdminStats = ({ from, to }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/dashboard/get-stats?From=${from}&To=${to}`, successHandler, errorHandler);
};

export const getAdminSalesChart = ({ from, to }, successHandler, errorHandler) => {
    return Web.get(Constants.ADMIN_API_BASE + `/dashboard/get-saleschart?From=${from}&To=${to}`, successHandler, errorHandler);
};

export const getPayments = ({ from, to, searchText, descending, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.ADMIN_API_BASE + `/PaymentTransactions/get-all?Descending=${descending}&SearchText=${searchText}&From=${from}&To=${to}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        successHandler,
        errorHandler
    );
};

export const validateAdminOtp = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/Onboarding/validate-onetoken`, data, successHandler, errorHandler);
};

export const sendAdminOtpSMS = (data, successHandler, errorHandler) => {
    return Web.post(Constants.API_BASE + `/Onboarding/admin/resend-phone-otp`, data, successHandler, errorHandler);
};

// /api/admin/v{version}/dashboard/get-saleschart
// /api/admin/v{version}/dashboard/get-stats

// export const downloadDoc = ({ adminOnly, pageNumber, pageSize }, successHandler, errorHandler) => {
//     return Web.get(Constants.ADMIN_API_BASE + `/Users/get-all?AdminOnly=${adminOnly}&PageNumber=${pageNumber}&PageSize=${pageSize}`, successHandler, errorHandler);
// };

// /Vendor/stats?Id=05b35af1-3adf-4e52-896d-9688837c7995&userId=05b35af1-3adf-4e52-896d-9688837c7995

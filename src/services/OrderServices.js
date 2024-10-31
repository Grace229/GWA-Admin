import { Web, Constants } from '/src/util';

export const getOrders = ({ buyerId, orderType, descending, location, pageNumber, pageSize }, successHandler, errorHandler) => {
    return Web.get(
        Constants.API_BASE +
            `/Orders/buyer/get-all?BuyersId=${buyerId}${location && '&Location=' + location}&Descending=${descending}&OrderType=${orderType}&PageNumber=${pageNumber}&PageSize=${pageSize}
    `,
        successHandler,
        errorHandler
    );
};

export const getOrderDocument = ({ orderId, documentType }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Checkout/order-documents?OrderId=${orderId}&DocumentType=${documentType}`, successHandler, errorHandler);
};

export const getOrderDetails = ({ orderId }, successHandler, errorHandler) => {
    return Web.get(Constants.API_BASE + `/Orders/get-orderdetails?OrderId=${orderId}`, successHandler, errorHandler);
};

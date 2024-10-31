export default class Constants {
    static API_BASE = '/api/v1';
    static ADMIN_API_BASE = '/api/admin/v1';
    // api for getting brands 'Brands/get-all'
    static authExcludeApiPaths = [
        'Market/get-vehicles',
        '/Onboarding/vendor/sign-up',
        '/Onboarding/vendor/validate-phone-otp',
        '/Onboarding/vendor/resend-phone-otp',
        '/Onboarding/vendor/confirm-email',
        '/Onboarding/vendor/resend-email-verification-link',
        '/Onboarding/vendor/create-password',
        '/Onboarding/vendor/stage',
        '/Onboarding/individual/signup',
        '/Onboarding/signin',
        '/Onboarding/forgot-password',
        '/Onboarding/resend-email-confirmation-otp',
        // '/Onboarding/refresh-token',
        '/Onboarding/confirm-email',
        '/Onboarding/reset-password',
        '/Onboarding/send-email-otp',
        '/Onboarding/send-sms-otp',
        '/Onboarding/validate-otp',
        'Brands/get-all',
        '/Market/get-models',
    ];

    static currencyFormat = '0,0.00';

    // static nairaSymbol = &#x20A6;

    static btcFormat = '0,0.00000000';

    static backOfficeAuth = ['BornfreeAdmin'];

    static merchantAuth = ['Merchant'];

    static nonAdminRoles = ['Individual', 'Vendor'];
    static adminRoles = ['SuperAdmin', 'BusinessAdmin', 'InspectionAdmin', 'InsuranceAdmin', 'FleetAdmin'];
    static vendorRoles = ['Vendor'];
    static individualRoles = ['Individual'];
    static financeOptions = ['Buy', 'Lease', 'Rent'];
    static financeOptionsEnum = [
        {
            id: '0',
            text1: 'Buy',
        },
        {
            id: '1',
            text1: 'Lease',
        },
        {
            id: '2',
            text1: 'Rent',
        },
    ];

    static ordersEnum = [
        {
            id: '0',
            text1: 'Buy',
        },
        {
            id: '1',
            text1: 'Car Loan',
        },
        {
            id: '2',
            text1: 'Lease',
        },
        {
            id: '3',
            text1: 'Rent',
        },
    ];

    static orderTypes = ['Buy', 'Car Loan', 'Lease', 'Rent'];
    static orderTypesMenu = [
        {
            id: '10',
            text1: 'All',
        },
        {
            id: '0',
            text1: 'Buy',
        },
        {
            id: '1',
            text1: 'Car Loan',
        },
        {
            id: '2',
            text1: 'Lease',
        },
        {
            id: '3',
            text1: 'Rent',
        },
    ];

    static paramTypesMenu = [
        {
            id: '0',
            text1: 'Number',
        },
        {
            id: '1',
            text1: 'Alphanumeric',
        },
        {
            id: '2',
            text1: 'List',
        },
        // {
        //     id: '3',
        //     text1: '3',
        // },
    ];

    static tenorMenu = [
        // {
        //     id: 0,
        //     text1: 'Select Tenor',
        // },
        {
            id: 3,
            text1: '3 Months',
        },
        {
            id: 6,
            text1: '6 Months',
        },
        {
            id: 9,
            text1: '9 Months',
        },
        {
            id: 12,
            text1: '12 months',
        },
    ];

    static transmissionTypes = [
        {
            id: '0',
            text1: 'Automatic',
        },
        {
            id: '1',
            text1: 'Manual',
        },
    ];

    static sortEnum = {
        Brand: 1,
        Model: 2,
        Added: 3,
        Year: 4,
        Price: 5,
    };

    static paymentStatus = ['pending', 'paid', 'notPaid'];

    static orderStatus = ['pending', 'eligibilityApproved', 'eligibilityRejected', 'approved', 'rejected'];
    static carStatus = ['pending', 'approved', 'rejected'];
    static vehicleStatus = ['Null', 'Draft', 'Pending', 'Published', 'Rejected', 'Sold'];
    static profileStatusEnum = ['pending', 'activated', 'deactivated', 'notBlocked', 'blocked'];

    static onboardingStatusMenu = [
        { id: '10', text1: 'All' },
        { id: '0', text1: 'Pending' },
        { id: '1', text1: 'Approved' },
        { id: '2', text1: 'Declined' },
    ];

    static onboardingStatusEnum = ['pending', 'approved', 'declined'];

    static profileStatusMenu = [
        { id: '10', text1: 'All' },
        { id: '0', text1: 'Pending' },
        { id: '1', text1: 'Activated' },
        { id: '2', text1: 'Deactivated' },
        { id: '3', text1: 'Not Blocked' },
        { id: '4', text1: 'Blocked' },
    ];

    static individualProfileStatusMenu = [
        { id: '10', text1: 'All' },
        { id: '0', text1: 'Active' },
        { id: '1', text1: 'Blocked' },
    ];

    static docType = [
        { text1: 'Insurance', id: 0 },
        { text1: 'AutoFinaceContract', id: 1 },
        // { text1: 'CarFax', id: 2 },
        // { text1: 'Evidence of delivery', id: 4 },
        { text1: 'InpectionReport', id: 3 },
        { text1: 'Delivery', id: 4 },
    ];

    static deliveryStatus = ['pending', 'delivered'];

    static contractStatusEnum = [
        { text1: 'Not Applicable', id: '0' },

        { text1: 'Accepted', id: '1' },

        { text1: 'Rejected', id: '2' },
    ];

    static InspectionReportStatus = [
        { text1: 'Pending', id: '0' },

        { text1: 'Accepted', id: '1' },

        { text1: 'Rejected', id: '2' },
    ];

    static irsEnum = ['pending', 'accepted', 'rejected'];

    static paymentStatusEnum = ['Card', 'Bank Transfer', 'The Alternative Bank Account'];

    static rolesMenu = [
        { id: '1', text1: 'Business Admin' },
        { id: '7', text1: 'Fleet Admin' },
        { id: '3', text1: 'Inspection Admin' },
        { id: '4', text1: 'Insurance Admin' },
        // { id: '2', text1: 'Seller Admin' },
        // { id: '0', text1: 'Super Admin' },
        // { id: '5', text1: 'Vendor' },
        // { id: '6', text1: 'Individual' },
    ];

    // static accountTypeMenu = {
    //     superAdmin: 0,
    //     BusinessAdmin: 1,
    //     sellerAdmin: 2,
    //     inspectionAdmin: 3,
    //     insuranceAdmin: 4,
    //     vendor: 5,
    // };

    static accountTypeEnum = ['SuperAdmin', 'BusinessAdmin', 'SellerAdmin', 'InspectionAdmin', 'InsuranceAdmin', 'Vendor', 'Individual', 'FleetAdmin'];

    static contractStatus = ['N/A', 'Accepted', 'Rejected'];

    static inspectionReportStatusEnum = ['Pending', 'Approved', 'Rejected'];

    static docTypes = [
        { text1: 'Insurance', id: '0' },
        { text1: 'Vehicle Papers', id: '1' },
        // { text1: 'Car Fax', id: '2' },
        { text1: 'Evidence of delivery', id: 4 },
        { text1: 'Inspection Report', id: '3' },
    ];

    static notificationTypeEnum = {
        General: 0,
        NewOrder: 1,
        Inspection: 2,
        VehicleStatus: 3,
        VendorStatus: 4,
        OrderStatus: 5,
    };
}

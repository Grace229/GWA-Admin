<template>
    <div>
        <button @click="makePayment()">Orderss</button>
    </div>
</template>

<script setup>
function makePayment() {
    FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST-e236bd46ba7c12ee76dc4a2d7f5c790f-X',
        tx_ref: generateReference(),
        amount: 54600,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        redirect_url: 'https://glaciers.titanic.com/handle-flutterwave-payment',
        meta: {
            consumer_id: 23,
            consumer_mac: '92a3-912ba-1192a',
        },
        customer: {
            email: 'rose@unsinkableship.com',
            phone_number: '08102909304',
            name: 'Rose DeWitt Bukater',
        },
        customizations: {
            title: 'AltDrive',
            description: 'Vehicle Payment',
            logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
        },
        callback: makePaymentCallback(),
        onclose: closedPaymentModal(),
    });
}

const makePaymentCallback = (response) => {
    console.log('Payment callback', response);
};
const closedPaymentModal = () => {
    console.log('payment modal is closed');
};
const generateReference = () => {
    let date = new Date();
    return 'Web' + date.getTime().toString();
};
</script>

<!-- <template>
    <form>
        <div>Your order is ₦54,600</div>
        <button type="button" id="start-payment-button" onclick="makePayment()">Pay Now</button>
    </form>
</template>
<script src="https://checkout.flutterwave.com/v3.js">
function makePayment() {
    FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST-e236bd46ba7c12ee76dc4a2d7f5c790f-X',
        tx_ref: 'titanic-48981487343MDI0NzMx',
        amount: 54600,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        redirect_url: 'https://glaciers.titanic.com/handle-flutterwave-payment',
        meta: {
            consumer_id: 23,
            consumer_mac: '92a3-912ba-1192a',
        },
        customer: {
            email: 'rose@unsinkableship.com',
            phone_number: '08102909304',
            name: 'Rose DeWitt Bukater',
        },
        customizations: {
            title: 'The Titanic Store',
            description: 'Payment for an awesome cruise',
            logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
        },
    });
}
</script> -->

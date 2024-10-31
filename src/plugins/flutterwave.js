// import { nanoid } from 'nanoid'; //if using nanoid

export function makePayment(data) {
    // console.log(data);
    window.FlutterwaveCheckout(data);
}

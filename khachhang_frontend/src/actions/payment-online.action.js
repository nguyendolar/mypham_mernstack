import {cartTypes } from '../constants/action.types'
import axios from 'axios'
export const paymentOnline = (amount,returnUrl) => async(dispatch, getState) => {
    try {
         console.log("data");
        let data = await axios.post('http://localhost:8080/payment-online', {
                amount: amount,
                returnUrl: returnUrl
            });
            console.log(data.data);
        return data.data;
        }
        catch(err) {
            console.log(err.response)
        }
}

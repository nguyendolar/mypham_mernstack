import React, { useState } from 'react';
import * as pa from '../actions/payment-online.action'
import axios from 'axios'
import { useParams } from "react-router-dom";

const Payment = () => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const { amount,billId } = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post('http://localhost:8080/payment-online', {
                amount: amount,
                returnUrl: `${'http://localhost:8080/change-payment-satus/'+billId}` 
     });
     console.log(data.data.data)
    setPaymentUrl(data.data.data);
  };

  return (
    <div className="container-fluid">
     
    </div>
  );
};

export default Payment;
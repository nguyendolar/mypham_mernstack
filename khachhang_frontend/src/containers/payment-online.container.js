import React, { useState } from 'react';
import * as pa from '../actions/payment-online.action'
import axios from 'axios'

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let data = await axios.post('http://localhost:8080/payment-online', {
                amount: amount,
                returnUrl: 'https://chat.openai.com/?model=text-davinci-002-render-sha'
     });
     console.log(data.data.data)
    setPaymentUrl(data.data.data);
  };

  return (
    <div className="container-fluid">
      {paymentUrl ? (
        <iframe style={{width: "100%",height: "1000px"}}  src={paymentUrl} title="Momo payment" />
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button type="submit">Pay with MOMO</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
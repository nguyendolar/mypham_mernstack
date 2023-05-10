'use strict'
const MomoPayment = require('momo-payment-sdk');
const uuid = require('uuid');


exports.momoPayment = async (req, res) => {
  const partnerCode = "MOMOOJOI20210710";
  const accessKey = "iPXneGmrJH0G8FOP";
  const secretKey = "sFcbSGRSJjwGxwhhcEktCHWYUuTuPNDB";
    
  let momoPaymentA = new MomoPayment({
        partnerCode,
        accessKey,
        secretKey
  });
  let orderId = uuid.v4();
  let orderInfo = 'Payment by MOMO';
  try {

    const result = await momoPaymentA.createPayment({
        requestId: `ID-${orderId}`,
        orderId,
        amount: req.body.amount.toString(),
        orderInfo,
        returnUrl:req.body.returnUrl,
        notifyUrl: req.body.returnUrl,
        extraData:""
    });
    console.log("re",result.data.payUrl)
    return res.status(200).json({data: result.data.payUrl})
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
    res.status(200).json({data: "dsds"})
}


const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const fetchuser = require('../middlewares/fetchuser');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET
})

router.post('/payment', fetchuser, async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order })
})

router.post('/verification', fetchuser, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsignature = crypto.createHmac('sha256', instance.key_secret).update(body.toString()).digest('hex');
    const isauth = expectedsignature === razorpay_signature;
    if (isauth) {
        await Payment.create({
            razorpay_order_id, razorpay_payment_id, razorpay_signature
        })
        res.status(200).json({ success: true })
        // res.redirect(`http://127.0.0.1:3000/paymentSuccess?reference=${razorpay_payment_id}`)
    }
    else {
        res.status(400).json({ success: false });
    }
})

router.get('/getkey', fetchuser, async (req, res) => {
    return res.status(200).json({ key: instance.key_id })
})

module.exports = router



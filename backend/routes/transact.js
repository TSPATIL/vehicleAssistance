const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Appoint = require('../models/Appointment');
const Transaction = require('../models/Transaction');

const fetchuser = require('../middlewares/fetchuser')

//Route 1: Create a mechanic using: POST "/api/mechanic/createmechanic". Login required.
router.post('/createtransact', fetchuser, [
    body('payeeName', 'Enter a valid Payee name').isLength({min: 10}),
    body('payeeEmail', 'Enter a valid Payee email').isEmail(),
    body('payeeContactNo', 'Enter a valid Payee mobile no.').isLength({min: 10, max: 10}),
    body('payeeAddress', 'Enter a valid Payee Address').exists(),
    body('payeeCountry', 'Enter a valid Payee Country').exists(),
    body('payeeState', 'Enter a valid Payee State').exists(),
    body('payeePincode', 'Enter a valid Payee Pincode').exists(),
    body('t_cost', 'Select the amount').exists(),
    body('t_status', 'Select the transaction status').exists(),
    body('appointID', 'Invalid appointment id').isLength({min: 24, max: 24}),
    body('mechanicID', 'Invalid mechanic id').isLength({min: 24, max: 24}),
], async (req, res)=>{
    try {
        let success = false;
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({success, error: result.array()});
        }
        const {payeeName, payeeEmail, payeeContactNo, payeeAddress, payeeCountry, payeeState, payeePincode, t_cost, appointID, mechanicID} = req.body;
        const appoint = Appoint.findById({_id: appointID});
        if(!appoint){
            return res.status(401).send("Appoint not found");
        }
        const transaction = new Transaction({
            payeeName, payeeEmail, payeeContactNo, payeeAddress, payeeCountry, payeeState, payeePincode, t_cost, appoint: appointID, mechanic: mechanicID, user: req.user.id
        });
        const savedTransact = await transaction.save();
        success = true;
        res.json({success, savedTransact});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 2: Update a mechanic details using: PUT "/api/mechanic/updatemechanic/:id". Login required.
router.put('/updatetransact/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {payeeName, payeeEmail, payeeContactNo, payeeAddress, payeeCountry, payeeState, payeePincode, t_cost, t_status} = req.body;
        //Create a newMechanic Object
        const newTransaction = {};
        if(payeeName){newTransaction.payeeName = payeeName}
        if(payeeEmail){newTransaction.payeeEmail = payeeEmail}
        if(payeeContactNo){newTransaction.payeeContactNo = payeeContactNo}
        if(payeeAddress){newTransaction.payeeAddress = payeeAddress}
        if(payeeCountry){newTransaction.payeeCountry = payeeCountry}
        if(payeeState){newTransaction.payeeState = payeeState}
        if(payeePincode){newTransaction.payeePincode = payeePincode}
        if(t_cost){newTransaction.t_cost = t_cost}
        if(t_status){newTransaction.t_status = t_status}

        //Find the appointment to be updated
        let transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).send("NotFound");
        }
        if(transaction.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        updateTransaction = await Transaction.findByIdAndUpdate(req.params.id, {$set: newTransaction}, {new: true});
        success = true;
        res.json({success, updateTransaction});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 3: Delete a mechanic details using: DELETE "/api/mechanic/deletemechanic/:id". Login required.
router.delete('/deletetransact/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;

        //Find the appointment to be deleted and delete it
        let transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).send("NotFound");
        }
        //Allow deletion if user owns this appointment
        if(transaction.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        const deleteTransaction = await Transaction.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, message: "Not has been deleted", deleteTransaction});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 4: Get all the mechanics using GET: "/api/mechanic/fetchallmechanics". Login Required
router.get('/fetchalltransact', fetchuser, async (req, res)=>{
    try {
        const transaction = await Transaction.find({user: req.user.id});
        res.json(transaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})
module.exports = router
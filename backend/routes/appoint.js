const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Appoint = require('../models/Appointment');
const fetchuser = require('../middlewares/fetchuser');
const Mechanic = require('../models/Mechanic');

//Route 1: Create a user using: POST "/api/aooint/createappoint". Login required.
router.post('/createappoint', fetchuser, [
    body('vOwnerName', 'Enter a valid Owner name').isLength({min: 10}),
    body('vOwnerEmail', 'Enter a valid Owner email').isEmail(),
    body('vOwnerContactNo', 'Enter a valid Owner mobile no.').isLength({min: 10, max: 10}),
    body('vOwnerAddress', 'Enter a valid Owner Address').exists(),
    body('vOwnerCountry', 'Select an Owner Countrey').exists(),
    body('vOwnerState', 'Select an Owner State').exists(),
    body('vOwnerPincode', 'Enter a valid Owner PinCode').isLength({min: 6, max: 6}),
    body('vDriverName', 'Enter a valid Driver Name').isLength({min: 10}),
    body('vDriverEmail', 'Enter a valid Driver Email').isEmail(),
    body('vDriverContactNo', 'Enter a valid Driver Mobile No.').isLength({min: 10, max: 10}),
    body('vType', 'Select the vehicle Type').exists(),
    body('vName', 'Enter a valid Vehicle name').isLength({min: 3}),
    body('vCompany', 'Enter a valid Vehicle Brand Name').exists(),
    body('vRegisteredNo', 'Enter a valid Vehicle Registration No.').isLength({min: 13}),
    body('vPickLocation', 'Enter a valid Pickup Location').exists(),
    body('omcomment').isLength({min: 0})
], async (req, res)=>{
    try {
        let success = false;
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({success, error: result.array()});
        }
        const {vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment} = req.body;
        const appoint = new Appoint({
            vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, user: req.user.id
        });
        const savedAppoint = await appoint.save();
        success = true;
        res.json({success, savedAppoint});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 2: Update a user details using: PUT "/api/aooint/updateappoint/:id". Login required.
router.put('/updateappoint/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status, t_status, mechanicID} = req.body;
        //Create a newAppoint Object
        const newAppoint = {};
        if(vOwnerName){newAppoint.vOwnerName = vOwnerName}
        if(vOwnerEmail){newAppoint.vOwnerEmail = vOwnerEmail}
        if(vOwnerContactNo){newAppoint.vOwnerContactNo = vOwnerContactNo}
        if(vOwnerAddress){newAppoint.vOwnerAddress = vOwnerAddress}
        if(vOwnerCountry){newAppoint.vOwnerCountry = vOwnerCountry}
        if(vOwnerState){newAppoint.vOwnerState = vOwnerState}
        if(vOwnerPincode){newAppoint.vOwnerPincode = vOwnerPincode}
        if(vDriverName){newAppoint.vDriverName = vDriverName}
        if(vDriverEmail){newAppoint.vDriverEmail = vDriverEmail}
        if(vDriverContactNo){newAppoint.vDriverContactNo = vDriverContactNo}
        if(vType){newAppoint.vType = vType}
        if(vName){newAppoint.vName = vName}
        if(vCompany){newAppoint.vCompany = vCompany}
        if(vRegisteredNo){newAppoint.vRegisteredNo = vRegisteredNo}
        if(vPickLocation){newAppoint.vPickLocation = vPickLocation}
        if(omcomment){newAppoint.omcomment = omcomment}
        if(a_status){newAppoint.a_status = a_status}
        if(t_status){newAppoint.t_status = t_status}
        if(mechanicID){
            const mechanic = await Mechanic.findById({_id: mechanic})
            if(!mechanic){
                return res.status(400).send("Mechanic doesn't exist");
            }
            if(mechanic.m_status.toString() !== "accepted"){
                return res.status(401).send("Not allowed");
            }
            newAppoint.mechanic = mechanicID;
        }

        //Find the appointment to be updated
        let appoint = await Appoint.findById(req.params.id);
        if(!appoint){
            return res.status(404).send("NotFound");
        }
        if(appoint.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        updateAppoint = await Appoint.findByIdAndUpdate(req.params.id, {$set: newAppoint}, {new: true});
        success = true;
        res.json({success, updateAppoint});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 3: Update a user details using: DELETE "/api/aooint/deleteappoint/:id". Login required.
router.delete('/deleteappoint/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status, t_status} = req.body;

        //Find the appointment to be deleted and delete it
        let appoint = await Appoint.findById(req.params.id);
        if(!appoint){
            return res.status(404).send("NotFound");
        }
        //Allow deletion if user owns this appointment
        if(appoint.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        const deleteAppoint = await Appoint.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, message: "Not has been deleted", deleteAppoint});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 4: Get all the appointments of user using GET: "/api/appoint/fetchallappoints". Login Required
router.get('/fetchallappoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({user: req.user.id});
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 4: Get all the non accepted appointments of user using GET: "/api/appoint/fetchallnaccptedAppoints". Login Required.
router.get('/fetchallnaccptedAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "waiting for approval"});
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 5: Update a user's appointment status details using: PUT "/api/aooint/updateappoint/:id". Login required.
router.put('/updateappointstatus/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {vOwnerName, vOwnerEmail, vOwnerContactNo, vOwnerAddress, vOwnerCountry, vOwnerState, vOwnerPincode, vDriverName, vDriverEmail, vDriverContactNo, vType, vName, vCompany, vRegisteredNo, vPickLocation, omcomment, a_status, t_status, t_cost} = req.body;
        //Create a newAppoint Object
        const newAppoint = {};
        if(vOwnerName){newAppoint.vOwnerName = vOwnerName}
        if(vOwnerEmail){newAppoint.vOwnerEmail = vOwnerEmail}
        if(vOwnerContactNo){newAppoint.vOwnerContactNo = vOwnerContactNo}
        if(vOwnerAddress){newAppoint.vOwnerAddress = vOwnerAddress}
        if(vOwnerCountry){newAppoint.vOwnerCountry = vOwnerCountry}
        if(vOwnerState){newAppoint.vOwnerState = vOwnerState}
        if(vOwnerPincode){newAppoint.vOwnerPincode = vOwnerPincode}
        if(vDriverName){newAppoint.vDriverName = vDriverName}
        if(vDriverEmail){newAppoint.vDriverEmail = vDriverEmail}
        if(vDriverContactNo){newAppoint.vDriverContactNo = vDriverContactNo}
        if(vType){newAppoint.vType = vType}
        if(vName){newAppoint.vName = vName}
        if(vCompany){newAppoint.vCompany = vCompany}
        if(vRegisteredNo){newAppoint.vRegisteredNo = vRegisteredNo}
        if(vPickLocation){newAppoint.vPickLocation = vPickLocation}
        if(omcomment){newAppoint.omcomment = omcomment}
        if(a_status){newAppoint.a_status = a_status}
        if(t_status){newAppoint.t_status = t_status}
        if(t_cost){newAppoint.t_cost = t_cost}
        if(a_status === 'accepted'){
            newAppoint.mechanic = req.user.id;
        }
        if(a_status === 'completed'){
            let appoint = await Appoint.findById(req.params.id);
        }

        //Find the appointment to be updated
        let appoint = await Appoint.findById(req.params.id);
        if(!appoint){
            return res.status(404).send("NotFound");
        }
        updateAppoint = await Appoint.findByIdAndUpdate(req.params.id, {$set: newAppoint}, {new: true});
        success = true;
        res.json({success, updateAppoint});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 6: Get all the  accepted and inprocess appointments of user using GET: "/api/appoint/fetchallnaccptedinAppoints". Login Required.
router.get('/fetchallnaccptedinAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "accepted", mechanic: req.user.id});
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 7: Get all the  accepted and completed appointments of user using GET: "/api/appoint/fetchallnaccptedcomAppoints". Login Required.
router.get('/fetchallnaccptedcomAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "completed", mechanic: req.user.id});
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})


//Route 8: Get all the non accepted appointments of main-user using GET: "/api/appoint/fetchallnaccptedcomAppoints". Login Required.
router.get('/fetchallnaccpteduserAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "waiting for approval", user: req.user.id });
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 9: Get all the accepted and ongoing appointments of main-user using GET: "/api/appoint/fetchallnaccptedcomAppoints". Login Required.
router.get('/fetchallaccpteduserinAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "accepted", user: req.user.id });
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 10: Get all the accepted and completed appointments of main-user using GET: "/api/appoint/fetchallnaccptedcomAppoints". Login Required.
router.get('/fetchallaccptedusercomAppoints', fetchuser, async (req, res)=>{
    try {
        const appoints = await Appoint.find({a_status: "completed", user: req.user.id });
        res.json(appoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 11: Get all details of appointment using GET: "/api/appoint/getappointdetails/:id". Login Required
router.get('/getappointdetails/:id', fetchuser, async (req, res)=>{
    try {
        const appoint = await Appoint.findById(req.params.id);
        res.json(appoint);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Mechanic = require('../models/Mechanic');
const User = require('../models/User');
const fetchuser = require('../middlewares/fetchuser')

//Route 1: Create a mechanic using: POST "/api/mechanic/createmechanic". Login required.
router.post('/createmechanic', fetchuser, [
    body('mName', 'Enter a valid Mechanic name').isLength({min: 10}),
    body('mEmail', 'Enter a valid Mechanic email').isEmail(),
    body('mContactNo', 'Enter a valid Mechanic mobile no.').isLength({min: 10, max: 10}),
    body('mAddress', 'Enter a valid Mechanic Address').exists(),
    body('mCountry', 'Enter a valid Mechanic Address').exists(),
    body('mState', 'Enter a valid Mechanic Address').exists(),
    body('mPincode', 'Enter a valid Mechanic Address').exists(),
    body('mType', 'Select the Mechanic Type').exists(),
    body('mGarageName', 'Enter a valid Garage Name').isLength({min: 5}),
    body('mGarageEmail', 'Enter a valid Garage Email').isEmail(),
    body('mGarageContactNo', 'Enter a valid Garage Mobile No.').isLength({min: 10, max: 10}),
    body('mGarageAddress', 'Enter a valid Garage Address').exists(),
    body('mLocation', 'Enter a valid garage Location').exists(),
    body('m_status', 'Enter a valid Pickup Location').isLength({min: 0})
], async (req, res)=>{
    try {
        let success = false;
        console.log(req.body)
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({success, error: result.array()});
        }
        const user = await User.findById(req.user.id)
        if(user.usertype.toString() !== 'Mechanic'){
            return res.status(401).send('Not Allowed');
        }
        const {mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation} = req.body;
        const mechanic = new Mechanic({
            mName, mEmail, mContactNo, mAddress, mCountry, mState, mPincode, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, user: req.user.id
        });
        const savedMechanic = await mechanic.save();
        success = true;
        res.json({success, savedMechanic});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 2: Update a mechanic details using: PUT "/api/mechanic/updatemechanic/:id". Login required.
router.put('/updatemechanic/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {mName, mEmail, mContactNo, mAddress, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status} = req.body;
        //Create a newMechanic Object
        const newMechanic = {};
        if(mName){newMechanic.mName = mName}
        if(mEmail){newMechanic.mEmail = mEmail}
        if(mContactNo){newMechanic.mContactNo = mContactNo}
        if(mAddress){newMechanic.mAddress = mAddress}
        if(mType){newMechanic.mType = mType}
        if(mGarageName){newMechanic.mGarageName = mGarageName}
        if(mGarageEmail){newMechanic.mGarageEmail = mGarageEmail}
        if(mGarageContactNo){newMechanic.mGarageContactNo = mGarageContactNo}
        if(mGarageAddress){newMechanic.mGarageAddress = mGarageAddress}
        if(mLocation){newMechanic.mLocation = mLocation}
        if(m_status){newMechanic.m_status = m_status}

        //Find the appointment to be updated
        let mechanic = await Mechanic.findById(req.params.id);
        if(!mechanic){
            return res.status(404).send("NotFound");
        }
        if(mechanic.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        updateMechanic = await Mechanic.findByIdAndUpdate(req.params.id, {$set: newMechanic}, {new: true});
        success = true;
        res.json({success, updateMechanic});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 3: Delete a mechanic details using: DELETE "/api/mechanic/deletemechanic/:id". Login required.
router.delete('/deletemechanic/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {mName, mEmail, mContactNo, mAddress, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation} = req.body;

        //Find the appointment to be deleted and delete it
        let mechanic = await Mechanic.findById(req.params.id);
        if(!mechanic){
            return res.status(404).send("NotFound");
        }
        //Allow deletion if user owns this appointment
        if(mechanic.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
        const deletemechanic = await Mechanic.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, message: "Not has been deleted", deletemechanic});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 4: Get all the mechanics using GET: "/api/mechanic/fetchallmechanics". Login Required
router.get('/fetchallmechanics', fetchuser, async (req, res)=>{
    try {
        const mechanics = await Mechanic.find({user: req.user.id});
        res.json(mechanics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 5: Get all non-approved mechanics using GET: "/api/mechanic/fetchallnonapprovedmechanics". Login Required
router.get('/fetchallnonapprovedmechanics', fetchuser, async (req, res)=>{
    try {
        const mechanics = await Mechanic.find({m_status: 'waiting for approval'});
        res.json(mechanics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 6: Get all approved mechanics using GET: "/api/mechanic/fetchallapprovedmechanics". Login Required
router.get('/fetchallapprovedmechanics', fetchuser, async (req, res)=>{
    try {
        const mechanics = await Mechanic.find({m_status: 'accepted'});
        res.json(mechanics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 7: Get all rejected mechanics using GET: "/api/mechanic/fetchallrejectedmechanics". Login Required
router.get('/fetchallrejectedmechanics', fetchuser, async (req, res)=>{
    try {
        const mechanics = await Mechanic.find({m_status: 'rejected'});
        res.json(mechanics);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 2: Update a mechanic status details using: PUT "/api/mechanic/updatemechanic/:id". Login required.
router.put('/updatemechanicstatus/:id', fetchuser, async (req, res)=>{
    try {
        let success = false;
        const {mName, mEmail, mContactNo, mAddress, mType, mGarageName, mGarageEmail, mGarageContactNo, mGarageAddress, mLocation, m_status} = req.body;
        //Create a newMechanic Object
        const newMechanic = {};
        if(mName){newMechanic.mName = mName}
        if(mEmail){newMechanic.mEmail = mEmail}
        if(mContactNo){newMechanic.mContactNo = mContactNo}
        if(mAddress){newMechanic.mAddress = mAddress}
        if(mType){newMechanic.mType = mType}
        if(mGarageName){newMechanic.mGarageName = mGarageName}
        if(mGarageEmail){newMechanic.mGarageEmail = mGarageEmail}
        if(mGarageContactNo){newMechanic.mGarageContactNo = mGarageContactNo}
        if(mGarageAddress){newMechanic.mGarageAddress = mGarageAddress}
        if(mLocation){newMechanic.mLocation = mLocation}
        if(m_status){newMechanic.m_status = m_status}

        //Find the appointment to be updated
        let mechanic = await Mechanic.findById(req.params.id);
        if(!mechanic){
            return res.status(404).send("NotFound");
        }
        updateMechanic = await Mechanic.findByIdAndUpdate(req.params.id, {$set: newMechanic}, {new: true});
        success = true;
        res.json({success, updateMechanic});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 11: Get all details of mechanic using GET: "/api/appoint/getappointdetails/:id". Login Required
router.get('/getmechanicdetails/:id', fetchuser, async (req, res)=>{
    try {
        console.log(req.params.id)
        const mechanic = await Mechanic.find({user: req.params.id});
        console.log(mechanic)
        res.json(mechanic);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

module.exports = router;
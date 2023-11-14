const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middlewares/fetchuser')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//Route 1: Create a user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('usertype', 'Please select the user type').exists(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must have atleast 6 characters').isLength({min: 6}),
    body('cpassword', 'Confirm Password must have atleast 6 characters').isLength({min: 6})
], async (req, res)=>{
    try {
        let success = false;
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({success, error: result.array()});
        }
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"});
        }
        if(req.body.password !== req.body.cpassword){
            return res.status(400).json({success, error: "Password and Confirm password must be same"});
        }
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            usertype: req.body.usertype,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 2: Login a user using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res)=>{
    try {
        let success = false
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({success, error: result.array()});
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({success, error: "Enter correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Enter correct credentials"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

//Route 3: Get details of loggedin user using: GET "/api/auth/getuser". Login required.
router.get('/getuser', fetchuser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error', message: error.message})
    }
})

module.exports = router;
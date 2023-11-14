const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { body, validationResult } = require('express-validator')

router.post("/mail", [
    body('name', "Please enter valid name").isLength({ min: 3 }),
    body('email', "Please enter valid email").isEmail(),
    body('subject', "Please enter subject").isLength({ min: 1 }),
    body('comment', "Please enter comment").isLength({ min: 3 })
], async (req, res) => {
    try {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success, error: result.array() });
        }
        const { name, email, subject, comment } = req.body;
        const transporter = nodemailer.createTransport({
            host: "Enter SMTP Setver Host Name",
            port: 587,
            secure: false, // User true if using port 465 and false for others
            auth: {
                user: 'Enter Username',
                pass: 'Enter Password'
            }
        }); // Refer nodemailer and respective smtp server service to fill data
        const info = await transporter.sendMail({
            from: `"${name}" "<${email}>"`,
            to: `${email}`, //change this string to email you want to receive
            subject: `${subject}`,
            text: `${comment}`,
            html: `<p><b>Dear Sir,</b> I am ${name}</p>
            <p>${comment}</p>`,
        });
        success = true;
        res.json({success, message: "Message Sent Successfully"});
    } catch (error) {
        res.status(500).json({ success: false, error: "Something went Wrong" })
    }
})

module.exports = router
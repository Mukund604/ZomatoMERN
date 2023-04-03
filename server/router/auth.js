const express = require('express');
const router = express.Router();
const Restraunts = require('../userSchema/RestrauntSchema');
const user = require('../userSchema/LogInSchema');
const jwt = require("jsonwebtoken");


require("../database/db");

//For signUp
router.post('/signup', (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Enter all the feilds");
        return res.status(400).json({ error: "Enter all feilds" });
    }

    user.findOne({ email: email }).then((userExists) => {
        if (userExists) {
            console.log("Email already is use");
            return res.status(400).json({ error: "User email already in use" });
        }

        const newUser = new user({ email, password });
        newUser.save().then(() => {
            console.log("User sucessfully registred");
            return res.status(200).json({ message: "User secessfully registered" });
        }).catch(err => {
            res.status(500).json({ error: "Some error occrued" });
        })
    }).catch(err => {
        console.log("Error");
    })
})

//For Login
router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Enter all the feilds");
            return res.status(400).json({ Error: "Enter all the feilds" });
        }

        //Finding the user using the email;
        const userLogin = await user.findOne({ email: email });

        if (!userLogin) {
            console.log("Invalid Credentials");
            return res.status(400).json({ error: "Invlaid credentials" });
        }

        //Now checking for password.
        const isMatching = false;
        if (password === userLogin.password) {
            console.log("Logged in sucessfully!");
            res.status(200).json({ Message: "Logged in Sucessfully" });
            // token = await .generateAuthToken();
            // console.log(token);
        } else {
            console.log("Invalid Credentials");
            return res.status(400).json({ Error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
})

//For Adding Restraunts.
router.post('/addrestraunt', (req, res) => {
    const { restrauntName, restrauntAddress, restrauntPhoneNumber, restrauntOwnerName, restrauntOwnerPhone, restrauntOwnerEmail } = req.body;
    if (!restrauntName || !restrauntAddress || !restrauntPhoneNumber || !restrauntOwnerName || !restrauntOwnerPhone || !restrauntOwnerEmail) {
        console.log("Enetr all the feilds");
        res.status(400).json({ error: "Enter all the feids" });
    }

    Restraunts.findOne({ restrauntName: restrauntName }).then((restrauntExists) => {
        if (restrauntExists) {
            console.log("Restraunt Already exists");
            res.status(400).json({ error: "Already exists" });
        } else {
            const newRestraunt = new Restraunts({ restrauntName, restrauntAddress, restrauntPhoneNumber, restrauntOwnerName, restrauntOwnerPhone, restrauntOwnerEmail });
            newRestraunt.save().then(() => {
                console.log("Added to the databse");
                res.status(200).json({ Message: "Submitted Sucessuflly" });
            }).catch((err) => {
                console.log("Error");
            })
        }
    }).catch((err) => {
        console.log("Error");
        res.status(400).json({ Error: "Error occured" });
    })

})

module.exports = router; 
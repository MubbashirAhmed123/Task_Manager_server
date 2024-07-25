const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {OAuth2Client} =require('google-auth-library')

require('dotenv').config()

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({

            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ error: 'Account already exist.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({

                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const client = new OAuth2Client(process.env.CLIENT_ID)


exports.googleLogin=async(req,res)=>{

    const {credential}=req.body

    const ticket=await client.verifyIdToken({
        idToken:credential,
        audience:process.env.CLIENT_ID
    })

    const{name,email}=ticket.getPayload()

    try {
        const isUserExist=await User.findOne({email})
        if(isUserExist){
            return res.status(200).json({token: generateToken(isUserExist._id),msg:'Account already exist.'})
        }
        const user = await User.create({ username:name, email, password:name });
        res.status(201).json({

            token: generateToken(user._id) ,msg:'Account created successfully.'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
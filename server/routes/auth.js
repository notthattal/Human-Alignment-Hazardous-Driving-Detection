const express = require('express');
const { createToken } = require('../utils/token');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { email, password, referredByUser, ...formData } = req.body;

    try {
        const { user, surveysCompleted, referralCode } = await User.register(email, password, referredByUser, formData)
        const token = createToken(user._id)

        res.status(200).json({ email, surveysCompleted, referralCode, token })
    } catch (err) {
        console.error(err);
        if (err.statusCode) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, surveysCompleted, referralCode } = await User.signIn(email, password)
        const token = createToken(user._id)

        res.status(200).json({ email, surveysCompleted, referralCode, token })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
});

module.exports = router;
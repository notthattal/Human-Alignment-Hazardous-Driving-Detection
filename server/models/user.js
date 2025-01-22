const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Result = require('../models/survey')
const { generateReferralCode } = require('../utils/referral')

const formSchema = new mongoose.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    licenseAge: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    ethnicity: { type: String, required: false },
    gender: { type: String, required: true },
    visuallyImpaired: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    referredByUser: { type: String },
    form: { type: formSchema, required: true }
});

userSchema.statics.register = async function (email, password, referredByUser, formData) {

    const emailExists = await this.findOne({ email })
 
    if (emailExists) {
        throw Error('Email already exists!')
    }

    if (referredByUser) {
        const referrerExists = await this.findOne({ referralCode: referredByUser }); 
        if (!referrerExists) {
            const error = new Error('Invalid referral code');
            error.statusCode = 400;
            throw error;
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const referralCode = await generateReferralCode();

    const user = await this.create({ 
        email, 
        password: hash, 
        referralCode,
        referredByUser,
        form: formData
    });

    return { user, referralCode };
};

userSchema.statics.signIn = async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('The email that was provided is not valid, please try again');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password');
    }

    const surveysCompleted = await Result.countDocuments({ userId: user.email });
    
    return { user, surveysCompleted, referralCode: user.referralCode };
}

const User = mongoose.model('User', userSchema);

module.exports = User;
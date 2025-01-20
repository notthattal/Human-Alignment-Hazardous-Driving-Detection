const { v4: uuidv4 } = require('uuid');

const generateReferralCode = async () => {
    const referralCode = uuidv4();
    return referralCode
}

module.exports = { generateReferralCode }
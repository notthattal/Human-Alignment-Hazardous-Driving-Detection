const jwt = require('jsonwebtoken');

const createToken = (_id, surveyCompletions) => {
    return jwt.sign({ _id, surveyCompletions}, process.env.SECRET, { expiresIn: '7d'})
}

module.exports = { createToken }
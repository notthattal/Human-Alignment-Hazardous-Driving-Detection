const express = require('express');
const router = express.Router();
const SurveyResult = require('../models/survey');
const User = require('../models/user');

router.post('/results', async (req, res) => {

    console.log(req.body)

    try {
        const body = req.body;
        const { userId, videoId, gaze, formData } = body;

        const cleanedGazeData = gaze.map(entry => ({
            time: entry.timestamp,
            x: entry.x,
            y: entry.y
        }));

        await SurveyResult.create({
            userId: userId,
            videoId: videoId,
            gaze: cleanedGazeData,
            formData: formData
        })

        await User.findByIdAndUpdate(
            userId, 
            {
              $inc: { numSurveysFilled: 1 },
              $set: { numRaffleEntries: Math.floor((user.numSurveysFilled + 1) / 3) }
            },
            { new: true }
        );
        

        res.status(201).json({ message: 'Survey result saved successfully; User data updated'});
    } catch (err) {

        console.log('An error has occurred while saving results', err)
        res.status(500).json({
            message: 'Error saving survey result',
            error: err.message
        });
    }
})

module.exports = router;
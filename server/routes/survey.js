const express = require('express');
const router = express.Router();
const SurveyResult = require('../models/survey')

router.post('/results', async (req, res) => {

    console.log("Survey Results:", req.body)

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

        res.status(201).json({ message: 'Survey result saved successfully'});
    } catch (err) {

        console.log('An error has occurred while saving results', err)
        res.status(500).json({
            message: 'Error saving survey result',
            error: err.message
        });
    }
})

module.exports = router;
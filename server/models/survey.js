const mongoose = require('mongoose');

const gazeSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    time: { type: Number, required: true }
});

const windowDimensions = new mongoose.Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true} 
});

const formSchema = new mongoose.Schema({
    hazardDetected: Boolean,
    noDetectionReason: String,
    detectionConfidence: Number,
    hazardSeverity: Number,
    attentionFactors: [{ type: String }],
    spacebarTimestamps: [{ type: Number }],
    startTime: Number,
    endTime: Number,
});

const resultSchema = new mongoose.Schema({
    userId: String,
    videoId: String,
    windowDimensions: windowDimensions,
    gaze: { type: [gazeSchema] },
    formData: formSchema
});

const SurveyResult = mongoose.model('Result', resultSchema)

module.exports = SurveyResult;

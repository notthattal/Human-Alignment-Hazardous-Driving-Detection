const mongoose = require('mongoose');

const gazeSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    time: { type: Number, required: true }
});

const formSchema = new mongoose.Schema({
    hazardDetected: Boolean,
    noDetectionReason: String,
    detectionConfidence: Number,
    hazardSeverity: Number,
    attentionFactor: [{ type: String }],
    spacebarTimestamps: [{ type: Number }],
    startTime: Number,
    endTime: Number,
});

const resultSchema = new mongoose.Schema({
    userId: String,
    videoId: String,
    gaze: { type: [gazeSchema] },
    formData: formSchema
});

const SurveyResult = mongoose.model('Result', resultSchema)

module.exports = SurveyResult;

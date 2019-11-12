import mongoose from "mongoose";

const evaluationRecordSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
});

const EvaluationRecord = mongoose.model('EvaluationRecord', evaluationRecordSchema);

export default EvaluationRecord;

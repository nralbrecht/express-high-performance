import mongoose from "mongoose";


const evaluationRecordSchema = new mongoose.Schema({
    sid: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    criteria: [{
        goalId: {
            type: Number,
            required: true
        },
        targetValue: {
            type: Number,
            required: true
        },
        actualValue: {
            type: Number,
            required: true
        }
    }]
});

// does not work
evaluationRecordSchema.index({ 'sid': 1, 'year': 1 }, { 'unique': true });

const EvaluationRecord = mongoose.model('EvaluationRecord', evaluationRecordSchema);

function init() {
    EvaluationRecord.init().then(() => {

        EvaluationRecord.collection.deleteMany({});

        create(new EvaluationRecord({
            "sid":91782,
            "year":2019,
            "criteria":[
                {"goalId":1,"targetValue":4,"actualValue":3},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":3},
                {"goalId":5,"targetValue":4,"actualValue":4},
                {"goalId":6,"targetValue":4,"actualValue":4}
            ]
        }));
        create(new EvaluationRecord({
            "sid":91782,
            "year":2018,
            "criteria":[
                {"goalId":1,"targetValue":4,"actualValue":4},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":3},
                {"goalId":5,"targetValue":4,"actualValue":2},
                {"goalId":6,"targetValue":4,"actualValue":3}
            ]
        }));
        create(new EvaluationRecord({
            "sid":84234,
            "year":2019,
            "criteria":[
                {"goalId":1,"targetValue":4,"actualValue":3},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":3},
                {"goalId":5,"targetValue":4,"actualValue":4},
                {"goalId":6,"targetValue":4,"actualValue":4}
            ]
        }));
    });

}

function readAll() {
    return EvaluationRecord.find();
}

function readBySid(sid) {
    return EvaluationRecord.find({sid: sid});
}

function readBySidAndYear(sid, year) {
    return EvaluationRecord.find({sid: sid, year: year});
}

function create(evaluationRecord) {
    return EvaluationRecord.create(evaluationRecord);
}

function update(evaluationRecord) {
    return EvaluationRecord.updateOne({sid: evaluationRecord.sid, year: evaluationRecord.year}, evaluationRecord);
}

function deleteAllBySid(sid) {
    return EvaluationRecord.deleteMany({sid: sid});
}


export default init();

export {
    EvaluationRecord,
    readAll,
    readBySid,
    readBySidAndYear,
    create,
    update,
    deleteAllBySid,
};


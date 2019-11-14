import mongoose from "mongoose";
import * as res from "express";

const evaluationRecordSchema = new mongoose.Schema({
    sid: Number,
    year: Number,
    criteria: [{
        goalId: Number,
        targetValue: Number,
        actualValue: Number
    }]
});

const EvaluationRecord = mongoose.model('EvaluationRecord', evaluationRecordSchema);

function readAll(res) {
    EvaluationRecord.find((err, records) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(records);
    });
}

function readBySid(res, sid) {
    EvaluationRecord.find({sid: sid}, (err, records) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(records);
    });
}

function readBySidAndYear(res, sid, year) {
    EvaluationRecord.find({sid: sid, year: year}, (err, records) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(records);
    });
}

function create(req, res) {
    const evaluationRecord = new EvaluationRecord(req.body);
    evaluationRecord.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(evaluationRecord);
    });
}




/**********************************************************************************************
 * Dojo functions
 **********************************************************************************************
 async function create(evaluationRecord) {
    // check if evaluation record for sid and year exists
    const check = await read(evaluationRecord.sid, evaluationRecord.year);
    if (check.length !== 0) return console.error("Evaluation record for sid and year already exists.");

    // save to db
    evaluationRecord.save(function (err, evalRec) {
        if (err) return console.error(err);
        console.log(JSON.stringify(evalRec));
    });
 }

 function read(sid, year) {
    return EvaluationRecord.find({sid: sid, year: year}, (err, records) =>{
        if (err) return console.error(err);
        return records;
    });
 }

 async function update(evaluationRecord) {
    // check if evaluation record for sid and year exists
    const check = await read(evaluationRecord.sid, evaluationRecord.year);
    if (check.length === 0) return console.error("Evaluation record for sid and year does not exists.");

    // update at db
    evaluationRecord.save(function (err, evaluationRecord) {
        if (err) return console.error(err);
        console.log(JSON.stringify(evaluationRecord));
    });
 }
 */


export {
    EvaluationRecord,
    readAll,
    readBySid,
    readBySidAndYear,
    create
};


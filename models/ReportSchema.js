import mongoose from "mongoose";
import {SocialEvaluation} from "./SocialEvaluationSchema";

const reportSchema = new mongoose.Schema({
    sid: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    }
});

// does not work
reportSchema.index({ 'sid': 1, 'year': 1 }, { 'unique': true });

const Report = mongoose.model('Report', reportSchema);

function init() {
    Report.init().then(() => {

        Report.collection.deleteMany({});

        // create test data
        // ...
        Report.create(new Report({
            "sid": 90123,
            "year": 2019,
            "state": "open",
            "remark": "bla bli blub"
        }));
        Report.create(new Report({
            "sid": 90123,
            "year": 2018,
            "state": "released",
            "remark": "bla bli blub"
        }));
        Report.create(new Report({
            "sid": 90123,
            "year": 2017,
            "state": "released",
            "remark": "bla bli blub"
        }));
        Report.create(new Report({
            "sid": 91782,
            "year": 2019,
            "state": "released",
            "remark": "bla bli blub"
        }));
    });
}

function readAll() {
    return Report.find();
}

function readBySid(sid) {
    return Report.find({sid: sid});
}

function readBySidAndYear(sid, year) {
    return Report.find({sid: sid, year: year});
}

function create(sid, year, data) {
    return Report.create(new Report({
        "sid": sid,
        "year": year,
        "state": data.state,
        "remark": data.remark
    }));
}

function update(sid, year, data) {
    return Report.updateOne({sid: sid, year: year}, {
        "sid": sid,
        "year": year,
        "state": data.state,
        "remark": data.remark
    });
}

function deleteAllBySid(sid) {
    return Report.deleteMany({sid: sid});
}


export default init();

export {
    Report,
    readAll,
    readBySid,
    readBySidAndYear,
    create,
    update,
    deleteAllBySid,
};
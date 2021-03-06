import mongoose from "mongoose";

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

async function init() {
    await Report.init();
    await Report.collection.deleteMany({});

    Report.create(new Report({
        "sid": 90123,
        "year": 2019,
        "state": "open",
        "remark": "Unfortunately, Mr. Smith was sick for a long period and could not pursue any sales activities."
    }));
    Report.create(new Report({
        "sid": 90123,
        "year": 2018,
        "state": "released",
        "remark": "Mr. Smith has been very successful and is highly valued by our key customers. Keep it up!"
    }));
    Report.create(new Report({
        "sid": 91337,
        "year": 2019,
        "state": "open",
        "remark": "Ms. Sallinger was hired this year and has already successfully sold vacuum cleaners to an important customer."
    }));
}

function readAll() {
    return Report.find();
}

function readBySid(sid) {
    return Report.find({sid: sid});
}

function readBySidAndYear(sid, year) {
    return Report.findOne({sid: sid, year: year});
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

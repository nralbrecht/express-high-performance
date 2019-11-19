import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    sid: {
        type: Number,
        unique: true,
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

const Report = mongoose.model('Report', reportSchema);

function init() {
    Report.init().then(() => {

        Report.collection.deleteMany({});

        // create test data
        // ...
        Report.create(new Report({
            "sid": 90123,
            "year": 2019,
            "state": "released",
            "remark": "bla bli blub"
        }));
    });
}



export default init();

export {
};
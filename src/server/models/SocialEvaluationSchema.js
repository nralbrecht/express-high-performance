import mongoose from "mongoose";
import { calculateSocialBonus } from '../controller/BonusCalculator'

const socialEvaluationSchema = new mongoose.Schema({
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
socialEvaluationSchema.index({ 'sid': 1, 'year': 1 }, { 'unique': true });

const SocialEvaluation = mongoose.model('SocialEvaluation', socialEvaluationSchema);

function init() {
    SocialEvaluation.init().then(() => {

        SocialEvaluation.collection.deleteMany({});

        create(
            90123,
            2019,
            [
                {"goalId":1,"targetValue":4,"actualValue":3},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":3},
                {"goalId":5,"targetValue":4,"actualValue":4},
                {"goalId":6,"targetValue":4,"actualValue":4}
            ]
        );
        create(
            90123,
            2018,
            [
                {"goalId":1,"targetValue":4,"actualValue":4},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":3},
                {"goalId":5,"targetValue":4,"actualValue":2},
                {"goalId":6,"targetValue":4,"actualValue":3}
            ]
        );
        create(
            91337,
            2019,
            [
                {"goalId":1,"targetValue":4,"actualValue":3},
                {"goalId":2,"targetValue":4,"actualValue":4},
                {"goalId":3,"targetValue":4,"actualValue":2},
                {"goalId":4,"targetValue":4,"actualValue":4},
                {"goalId":5,"targetValue":4,"actualValue":4},
                {"goalId":6,"targetValue":4,"actualValue":2}
            ]
        );
    });
}

function addBonusToSocialEvaluation(evaluation) {
    for (let i = 0; i < evaluation.criteria.length; i++) {
        let bonus = calculateSocialBonus(evaluation.criteria[i]);

        evaluation.criteria[i] = {
            "_id": evaluation.criteria[i]._id,
            "goalId": evaluation.criteria[i].goalId,
            "targetValue": evaluation.criteria[i].targetValue,
            "actualValue": evaluation.criteria[i].actualValue,
            "bonus": bonus
        };
    }

    return evaluation;
}

async function readAll() {
    let social = await SocialEvaluation.find({sid: sid});

    return social.map((social) => addBonusToSocialEvaluation(social));
}

async function readBySid(sid) {
    let social = await SocialEvaluation.find({sid: sid});

    return social.map((social) => addBonusToSocialEvaluation(social));
}

async function readBySidAndYear(sid, year) {
    let social = await SocialEvaluation.findOne({sid: sid, year: year});

    return addBonusToSocialEvaluation(social);
}

function create(sid, year, criteria) {
    return SocialEvaluation.create(new SocialEvaluation({
        "sid": sid,
        "year": year,
        "criteria": criteria
    }));
}

function update(sid, year, criteria) {
    return SocialEvaluation.updateOne({sid: sid, year: year}, {
        "sid": sid,
        "year": year,
        "criteria": criteria
    });
}

function deleteAllBySid(sid) {
    return SocialEvaluation.deleteMany({sid: sid});
}

export default init();

export {
    SocialEvaluation,
    readAll,
    readBySid,
    readBySidAndYear,
    create,
    update,
    deleteAllBySid
};


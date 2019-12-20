import { Router } from 'express';
import * as socialEvaluation from "../models/SocialEvaluationSchema";
import { calculateSocialTotalBonus } from "../controller/BonusCalculator";

const router = Router();

router.get('/:sid/report/:year/social', async (req, res) => {
    try {
        const records = await socialEvaluation.readBySidAndYear(req.params.sid, req.params.year);
        if (records.length === 0) {
            return res.status(400).send("Could not be found! Social evaluation record does not exist.");
        }
        const social = {
            "social": records.criteria,
            "totalBonus": calculateSocialTotalBonus(records.criteria)
        };
        return res.status(200).send(social);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

// works
router.post('/:sid/report/:year/social', async (req, res) => {
    try {
        const records = await socialEvaluation.create(req.params.sid, req.params.year, req.body);
        return res.status(200).send(records);
    }
    catch (err) {
        // duplicate key error
        if (err.code === 11000) {
            return res.status(400).send("Evaluation record was not created! Social evaluation record for sid and year already exists.");
        }
        // different error
        console.log(err);
        return res.status(400).send("Error!");
    }
});

// works
router.put('/:sid/report/:year/social', async (req, res) => {
    try {
        const message = await socialEvaluation.update(req.params.sid, req.params.year, req.body);
        return res.status(200).send(message);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

export default router;

import { Router } from 'express';
import * as report from "../models/ReportSchema";
import { updateBonusGehalt } from "../adapters/OrangeHRMAdapter";
import { getOrdersBySalesmenAndYear } from "../adapters/OpenCRXAdapter";
import { readBySidAndYear } from "../models/SocialEvaluationSchema";
import { calculateOrdersTotalBonus, calculateSocialTotalBonus } from "../controller/BonusCalculator";

const router = Router();

router.get('/:sid/report', async (req, res) => {
    try {
        const reports = await report.readBySid(req.params.sid);
        return res.status(200).send(reports);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

router.get('/:sid/report/:year', async (req, res) => {
    try {
        const reports = await report.readBySidAndYear(req.params.sid, req.params.year);

        if (!reports) {
            return res.status(404).send("Could not be found! Report record does not exist.");
        }

        return res.status(200).send(reports);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

router.post('/:sid/report/:year', async (req, res) => {
    try {
        const reports = await report.create(req.params.sid, req.params.year, req.body);
        return res.status(200).send(reports);
    }
    catch (err) {
        if (err.code === 11000) {
            // duplicate key error
            return res.status(400).send("Report was not created! Report record for sid and year already exists.");
        }
        else {
            console.log(err);
            return res.status(400).send("Error!");
        }
    }
});

router.put('/:sid/report/:year', async (req, res) => {
    try {
        const message = await report.update(req.params.sid, req.params.year, req.body);

        if (req.body.state === "released") {
            const orders = await getOrdersBySalesmenAndYear(req.params.sid, req.params.year);
            const socials = await readBySidAndYear(req.params.sid, req.params.year);
            const totalBonus = calculateOrdersTotalBonus(orders) + calculateSocialTotalBonus(socials.criteria);
            await updateBonusGehalt(req.params.sid, totalBonus);
        }

        return res.status(200).send(message);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

export default router;

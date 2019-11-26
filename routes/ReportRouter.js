import { Router } from 'express';
import * as report from "../models/ReportSchema";
import { updateBonusGehalt } from "../adapter/OrangeHRMAdapter";

const router = Router();

// works
router.get('/:sid/report', async (req, res) => {
    try {
        const reports = await report.readBySid(req.params.sid);
        return res.status(200).send(reports);
    }
    catch (err) {
        console.log(err);
        return res.status(409).send("Error!");
    }
});

// works
router.get('/:sid/report/:year', async (req, res) => {
    try {
        const reports = await report.readBySidAndYear(req.params.sid, req.params.year);
        if (reports.length === 0)
            return res.status(409).send("Could not be found! Report record does not exist.");
        return res.status(200).send(reports);
    }
    catch (err) {
        console.log(err);
        return res.status(409).send("Error!");
    }
});

// works
router.post('/:sid/report/:year', async (req, res) => {
    try {
        const reports = await report.create(req.params.sid, req.params.year, req.body);
        return res.status(200).send(reports);
    }
    catch (err) {
        // duplicate key error
        if (err.code === 11000)
            return res.status(409).send("Report was not created! Report record for sid and year already exists.");
        // different error
        console.log(err);
        return res.status(409).send("Error!");
    }
});

// TODO: Connect to controller calculation function (Jenny)
router.put('/:sid/report/:year', async (req, res) => {
    try {
        const message = await report.update(req.params.sid, req.params.year, req.body);
        if (req.body.state === "released") {

            updateBonusGehalt(req.params.sid, 302);
        }
        return res.status(200).send(message);
    }
    catch (err) {
        console.log(err);
        return res.status(409).send("Error!");
    }
});

export default router;

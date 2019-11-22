import { Router } from 'express';
import {create, deleteBySid, readAll, readBySid, update} from "../models/SalesMenSchema";
import {
    readBySid as readSocialBySid,
    readBySidAndYear as readSocialBySidAndYear,
    create as createSocial,
    update as updateSocial
} from "../models/SocialEvaluationSchema";
import {
    readBySid as readReportBySid,
    readBySidAndYear as readReportBySidAndYear,
    create as createReport,
    update as updateReport
} from "../models/ReportSchema";

const router = Router();

// TODO: Call methods from OrangeHRMAdapater (Jenny)
router.get('/', (req, res) => {
    return readAll()
        .then(function(records) {
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// TODO: Call methods from OrangeHRMAdapater (Jenny)
router.get('/:sid', (req, res) => {
    return readBySid(req.params.sid)
        .then(function(records) {
            if (records.length === 0) return res.status(409).send("Could not be found! Sales man does not exist.");
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.get('/:sid/report', (req, res) => {
    return readReportBySid(req.params.sid)
        .then(function(reports) {
            return res.status(200).send(reports);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.get('/:sid/report/:year', (req, res) => {
    return readReportBySidAndYear(req.params.sid, req.params.year)
        .then(function(reports) {
            if (reports.length === 0) return res.status(409).send("Could not be found! Report record does not exist.");
            return res.status(200).send(reports);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.post('/:sid/report/:year', (req, res) => {
    return createReport(req.params.sid, req.params.year, req.body)
        .then(function(reports) {
            return res.status(200).send(reports);
        })
        .catch(function(err) {
            // duplicate key error
            if (err.code === 11000) return res.status(409).send("Report was not created! Report record for sid and year already exists.");
            // different error
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.put('/:sid/report/:year', (req, res) => {
    return updateReport(req.params.sid, req.params.year, req.body)
        .then(function(message) {
            return res.status(200).send(message);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.get('/:sid/report/:year/social', (req, res) => {
    return readSocialBySidAndYear(req.params.sid, req.params.year)
        .then(function(records) {
            if (records.length === 0) return res.status(409).send("Could not be found! Social evaluation record does not exist.");
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.post('/:sid/report/:year/social', (req, res) => {
    return createSocial(req.params.sid, req.params.year, req.body)
        .then(function(records) {
            return res.status(200).send(records);
        })
        .catch(function(err) {
            // duplicate key error
            if (err.code === 11000) return res.status(409).send("Evaluation record was not created! Social evaluation record for sid and year already exists.");
            // different error
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// works
router.put('/:sid/report/:year/social', (req, res) => {
    return updateSocial(req.params.sid, req.params.year, req.body)
        .then(function(message) {
            return res.status(200).send(message);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

// TODO: To be implemented (Nils)
router.get('/:sid/report/:year/orders', (req, res) => {

});


export default router;

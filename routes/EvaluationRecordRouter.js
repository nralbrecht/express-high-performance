import { Router } from 'express';
import { readAll, readBySid, readBySidAndYear, create, update, deleteAllBySid } from '../models/SocialEvaluationSchema';

const router = Router();

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

router.get('/:sid', (req, res) => {
    return readBySid(req.params.sid)
        .then(function(records) {
            if (records.length === 0) return res.status(409).send("Could not be found! Evaluation record does not exist.");
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

router.get('/:sid/:year', (req, res) => {
    return readBySidAndYear(req.params.sid, req.params.year)
        .then(function(records) {
            if (records.length === 0) return res.status(409).send("Could not be found! Evaluation record does not exist.");
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

router.post('/', (req, res) => {
    return create(req.body)
        .then(function(records) {
            return res.status(200).send(records);
        })
        .catch(function(err) {
            // duplicate key error
            if (err.code === 11000) return res.status(409).send("Evaluation record was not created! Evaluation record for sid and year already exists.");
            // different error
            console.log(err);
            return res.status(409).send("Error!");
        });
});

router.put('/', (req, res) => {
    return update(req.body)
        .then(function(message) {
            return res.status(200).send(message);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

router.delete('/:sid', (req, res) => {
    return deleteAllBySid(req.params.sid)
        .then(function (message) {
            return res.status(200).send(message);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});


export default router;

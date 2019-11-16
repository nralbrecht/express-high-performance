import { Router } from 'express';
import {create, deleteBySid, readAll, readBySid, update} from "../models/SalesMenSchema";

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
            if (records.length === 0) return res.status(409).send("Could not be found! Sales man does not exist.");
            return res.status(200).send(records);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

router.post('/', (req, res) => {
    return create(req.body)
        .then(function(salesMan) {
            return res.status(200).send(salesMan);
        })
        .catch(function(err) {
            // duplicate key error
            if (err.code === 11000) return res.status(409).send("Sales man was not created! Sales man with sid already exists.");
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
    return deleteBySid(req.params.sid)
        .then(function (message) {
            return res.status(200).send(message);
        })
        .catch(function(err) {
            console.log(err);
            return res.status(409).send("Error!");
        });
});

export default router;

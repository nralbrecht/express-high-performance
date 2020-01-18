import { Router } from 'express';
import { getAllSalesmen, getSalesmenById } from "../adapters/OrangeHRMAdapter";
import crypto from "../controller/Crypto";

const router = Router();

router.get('/', async (req, res) => {
    try {
        try {
            if (await crypto.testTokenRole(req.token, "sales") && !await crypto.testTokenIdCRX(req.token, req.params.sid)) {
                return res.sendStatus(401);
            }
        } catch (error) {
            return res.sendStatus(401);
        }

        const records = await getAllSalesmen();
        return res.status(200).send(records);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});

router.get('/:sid', async (req, res) => {
    try {
        try {
            if (await crypto.testTokenRole(req.token, "sales") && !await crypto.testTokenIdCRX(req.token, req.params.sid)) {
                return res.sendStatus(401);
            }
        } catch (error) {
            return res.sendStatus(401);
        }

        const records = await getSalesmenById(req.params.sid);
        if (records.length === 0) {
            return res.status(400).send("Could not be found! Sales man does not exist.");
        }
        return res.status(200).send(records);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Error!");
    }
});


export default router;

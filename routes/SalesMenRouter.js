import { Router } from 'express';
import { readAll, readBySid } from "../models/SalesMenSchema";

const router = Router();

// TODO: Call methods from OrangeHRMAdapater (Jenny)
router.get('/', async (req, res) => {
    try {
        const records = await readAll();
        return res.status(200).send(records);
    }
    catch (err) {
        console.log(err);
        return res.status(409).send("Error!");
    }
});

// TODO: Call methods from OrangeHRMAdapater (Jenny)
router.get('/:sid', async (req, res) => {
    try {
        const records = await readBySid(req.params.sid);
        if (records.length === 0) {
            return res.status(409).send("Could not be found! Sales man does not exist.");
        }
        return res.status(200).send(records);
    }
    catch (err) {
        console.log(err);
        return res.status(409).send("Error!");
    }
});

export default router;

import { Router } from 'express';
import { getAllSalesmen, getSalesmenById } from "../adapters/OrangeHRMAdapter";

const router = Router();

router.get('/', async (req, res) => {
    try {
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

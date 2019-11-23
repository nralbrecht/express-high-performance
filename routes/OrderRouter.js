import { Router } from 'express';
import crx from '../models/OpenCRXAdapter';

const router = Router();

router.get('/:sid/report/:year/orders', async (req, res) => {
    try {
        const orders = await crx.getOrdersBySalesmenAndYear(req.params.sid, +req.params.year);

        res.send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;

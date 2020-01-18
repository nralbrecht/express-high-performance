import { Router } from 'express';
import { getOrdersBySalesmenAndYear } from '../adapters/OpenCRXAdapter';
import { calculateOrdersTotalBonus } from '../controller/BonusCalculator';
import crypto from "../controller/Crypto";

const router = Router();

router.get('/:sid/report/:year/orders', async (req, res) => {
    try {
        try {
            if (await crypto.testTokenRole(req.token, "sales") && !await crypto.testTokenIdCRX(req.token, req.params.sid)) {
                return res.sendStatus(401);
            }
        } catch (error) {
            return res.sendStatus(401);
        }

        const orders = await getOrdersBySalesmenAndYear(req.params.sid, +req.params.year);

        const totalOrderBonus = calculateOrdersTotalBonus(orders);

        res.send({
            "orders": orders,
            "totalBonus": totalOrderBonus
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;

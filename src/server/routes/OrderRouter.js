import { Router } from 'express';
import { getOrdersBySalesmenAndYear } from '../adapters/OpenCRXAdapter';
import { calculateOrdersTotalBonus } from '../controller/BonusCalculator';

const router = Router();

router.get('/:sid/report/:year/orders', async (req, res) => {
    try {
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

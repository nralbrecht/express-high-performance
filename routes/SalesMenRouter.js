import { Router } from 'express';
import SalesMenFactory from '../factories/SalesMenFactory'

const router = Router();

router.get('/', (req, res) => {
    return res.send("get salesmen");
});

router.get('/:userId', (req, res) => {
    let salesmen = SalesMenFactory.createSalesMen(90123, "Nils", "Albrecht");

    return res.send("get salesmen " + req.params.userId + "\n" + JSON.stringify(salesmen));
});

export default router;

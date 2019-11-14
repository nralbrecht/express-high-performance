import { Router } from 'express';
import { readAll, readBySid, readBySidAndYear, create } from '../models/EvaluationRecordSchema';

const router = Router();

router.get('/', (req, res) => {
    return readAll(res);
});

router.get('/:sId', (req, res) => {
    return readBySid(res, req.params.sId);
});

router.get('/:sId/:year', (req, res) => {
    return readBySidAndYear(res, req.params.sId, req.params.year);
});

router.post('/', (req, res) => {
    return create(req, res);
})


export default router;

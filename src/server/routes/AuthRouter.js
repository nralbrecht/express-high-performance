import { Router } from 'express';

const router = Router();

router.post('/issueToken', async (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        res.status(200).send({
            "username": req.body.username,
            "roles": ["admin", "sales", "ceo", "hr"],
            "token": "1234567890"
        });
    }
    else {
        res.status(400).send("username and password are required");
    }
});

export default router;

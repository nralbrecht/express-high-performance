import { Router } from 'express';
import { readAll, readByUsername } from "../models/AccountSchema";
import crypto from "../controller/Crypto";
import config from '../../../config';

const router = Router();

router.post('/issueToken', async (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        const users = await readByUsername(req.body.username);

        if (users && users.length > 0) {
            const user = users[0];

            try {
                const isPasswordValid = crypto.verifyPasswordHash(req.body.password, user.passwordHash);

                if(isPasswordValid) {
                    let payload = {
                        "idHR": user.idHR,
                        "username": user.username,
                        "roles": user.roles,
                        "exp": Math.floor(Date.now() / 1000) + config.JWT_EXPIRES_IN_SEC
                    };

                    if (user.idCRX) {
                        payload.idCRX = user.idCRX;
                    }

                    payload.token = await crypto.signToken(payload);

                    res.status(200).send(payload);
                }
                else {
                    res.status(400).send("login failed");

                }
            } catch (error) {
                console.log(error);
                res.status(400).send("login failed");
            }
        }
        else {
            res.status(404).send("user not found");
        }
    }
    else {
        res.status(400).send("username and password are required");
    }
});

router.get('/account', async (req, res) => {
    const accounts = await readAll();

    res.status(200).send(accounts.map(account => {
        let result = {
            "idHR": account.idHR,
            "username": account.username,
            "roles": account.roles
        };

        if (account.idCRX) {
            result.idCRX = account.idCRX;
        }

        return result;
    }));
});

export default router;

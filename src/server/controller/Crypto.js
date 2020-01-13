import config from "../../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generatePaswordHash(password) {
    return bcrypt.hash(password, config.BCRYPT_ROUNDS);
}

function verifyPasswordHash(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

function verifyToken(token) {
    return new Promise(function (fulfill, reject){
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(decoded);
            }
        });
    });
}

function signToken(payload) {
    return new Promise(function (fulfill, reject){
        jwt.sign(payload, config.JWT_SECRET, { "algorithm": config.JWT_ALGORITHM }, function(err, encoded) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(encoded);
            }
        });
    });
}

export default {
    generatePaswordHash,
    verifyPasswordHash,
    verifyToken,
    signToken
}

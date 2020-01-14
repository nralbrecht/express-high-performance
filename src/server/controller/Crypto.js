import config from "../../../config";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function generatePaswordHash(password) {
    const salt = crypto.randomBytes(config.SALT_LENGTH)
        .toString("hex")
        .slice(0, config.SALT_LENGTH);

    let hash = crypto.createHmac("sha512", salt);
    hash.update(salt + "." + password);

    return salt + "." + hash.digest("hex");
}

function verifyPasswordHash(password, passwordHash) {
    const splitHash = passwordHash.split(".");

    let hash = crypto.createHmac("sha512", splitHash[0]);
    hash.update(splitHash[0] + "." + password);

    return hash.digest('hex') === splitHash[1];
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

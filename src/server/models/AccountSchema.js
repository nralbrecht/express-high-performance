import mongoose from "mongoose";
import crypto from "../controller/Crypto"

const accountSchema = new mongoose.Schema({
    idHR: {
        type: Number,
        required: true
    },
    idCRX: {
        type: Number,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true
    }]
});

const Account = mongoose.model('Account', accountSchema);

function init() {
    Account.init().then(async () => {
        Account.collection.deleteMany({});

        Account.create(new Account({
            "idHR": 7,
            "idCRX": 90123,
            "username": "john",
            "passwordHash": await crypto.generatePaswordHash("password"),
            "roles": ["sales"]
        }));
        Account.create(new Account({
            "idHR": 30,
            "idCRX": 91337,
            "username": "mary",
            "passwordHash": await crypto.generatePaswordHash("password"),
            "roles": ["sales"]
        }));
        Account.create(new Account({
            "idHR": 10,
            "username": "chantal",
            "passwordHash": await crypto.generatePaswordHash("password"),
            "roles": ["hr"]
        }));
        Account.create(new Account({
            "idHR": 8,
            "idCRX": 90001,
            "username": "moore",
            "passwordHash": await crypto.generatePaswordHash("password"),
            "roles": ["ceo"]
        }));
        Account.create(new Account({
            "idHR": 11,
            "username": "tom",
            "passwordHash": await crypto.generatePaswordHash("password"),
            "roles": ["admin"]
        }));
    });
}

function readAll() {
    return Account.find();
}

function readByUsername(username) {
    return Account.find({username: username});
}

function deleteAllByUsername(username) {
    return Account.deleteMany({username: username});
}

export default init();

export {
    Account,
    readAll,
    readByUsername,
    deleteAllByUsername
};

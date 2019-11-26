import mongoose from "mongoose";
import {createSalesMan} from "../factories/SalesManFactory";

const salesMenSchema = new mongoose.Schema({
    sid: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

const SalesMen = mongoose.model('SalesMan', salesMenSchema);

function init() {
    SalesMen.init().then(() => {

        SalesMen.collection.deleteMany({});

        create(createSalesMan(91782, "William", "Riden", "Sales"));
        create(createSalesMan(84234, "Mary-Ann", "Sallinger", "Sales"));
        create(createSalesMan(90123, "John", "Smith", "Sales"));
    });
}

function readAll() {
    return SalesMen.find();
}

function readBySid(sid) {
    return SalesMen.findOne({sid: sid});
}

function create(salesMan) {
    return SalesMen.create(salesMan);
}

function update(salesMan) {
    return SalesMen.updateOne({sid: salesMan.sid}, salesMan);
}

function deleteBySid(sid) {
    return SalesMen.deleteOne({sid: sid});
}


export default init();

export {
    SalesMen,
    readAll,
    readBySid,
    create,
    update,
    deleteBySid,
};

import mongoose from "mongoose";

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
    }
});

const SalesMen = mongoose.model('SalesMen', salesMenSchema);

export default SalesMen;

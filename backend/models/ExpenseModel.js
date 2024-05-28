const mongoose = require("mongoose");
const { Schema } = mongoose;
const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        default: "Expense",
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)
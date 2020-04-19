const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    }
})

module.exports = mongoose.model('Orders', orderSchema)
const mongoose = require('mongoose')

const path = require('path')
const coverImageBasePath = 'uploads/productCovers'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    referenceID: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

productSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage != null) {
        return path.join('/', coverImageBasePath, this.coverImage)
    }
})

module.exports = mongoose.model('Products', productSchema)
module.exports.coverImageBasePath = coverImageBasePath
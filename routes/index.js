const express = require('express')
const router = express.Router()
const Products = require('../models/products')

router.get('/', async (req, res) => {
    let products
    try {
        products = await Products.find().sort({createdAt: 'desc'}).limit(10).exec()
    } catch {
        products = []
    }
    res.render('index', { products: products })
})

module.exports = router
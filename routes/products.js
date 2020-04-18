const express = require('express')
const router = express.Router()
const Product = require('../models/products')

// All Products Route
router.get('/', (req, res) => {
    res.render('products/index')
})

// New Product Route
router.get('/new', (req, res) => {
    res.render('products/new', { product: new Product() })
})

// Create Product Route
router.post('/', (req, res) => {
    res.send(req.body.name)
})

module.exports = router
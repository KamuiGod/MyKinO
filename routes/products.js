const express = require('express')
const router = express.Router()
const Products = require('../models/products')

// All Products Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const products = await Products.find(searchOptions)
        res.render('products/index', { 
            products: products,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

// New Product Route
router.get('/new', (req, res) => {
    res.render('products/new', { product: new Products() })
})

// Create Product Route
router.post('/', async (req, res) => {
    const product = new Products({
        name: req.body.name
    })
    try {
        const newProduct = await product.save()
        //res.redirect(`products/${newProducts.id}`)
        res.redirect(`products`)
    } catch {
        res.render('products/new', {
            product: product,
            errorMessage: "Erreur lors de la création du produit"
        })
    }
})

module.exports = router
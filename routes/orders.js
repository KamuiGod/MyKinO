const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const Products = require('../models/products')

// All Orders Route
router.get('/', async (req, res) => {
    res.send('Toutes les commandes de vos clients')
})

// New Order Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Orders())
})

// Create Order Route
router.post('/', async (req, res) => {
    const order = new Orders({
        description: req.body.description,
        createdAt: new Date(req.body.createdAt),
        product: req.body.product
    })

    try {
        const newOrder = await order.save()
        //res.redirect(`orders/${newOrder.id}`)
        res.redirect('orders')
    } catch {
        renderNewPage(res, order, true)        
    }
})

async function renderNewPage(res, order, hasError = false) {
    try {
        const products = await Products.find({})
        const params = {
            products: products,
            order: order
        }
        if (hasError) params.errorMessage = 'Une erreur est survenue lors de la création du produit.'
        res.render('orders/new', params) 
    } catch {
        res.redirect('/orders')
    }
}

module.exports = router
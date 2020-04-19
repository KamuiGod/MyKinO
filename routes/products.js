const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


// All Products Route
router.get('/', async (req, res) => {
    let query = Products.find()
    if (req.query.name != null && req.query.name !== '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'))
    }
    else if (req.query.referenceID != null && req.query.referenceID !== '') {
        query = query.regex('referenceID', new RegExp(req.query.referenceID, 'i'))
    }
    try {
        const products = await query.exec()
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
        name: req.body.name,
        referenceID: req.body.referenceID,
        price: req.body.price,
        description: req.body.description,
    })
    saveCover(product, req.body.cover)

    try {
        const newProduct = await product.save()
        //res.redirect(`products/${newProducts.id}`)
        res.redirect('/products')
    } catch {
        //if (product.coverImage != null) {
        //    removeProductCover(product.coverImage)
        //}
        res.render('products/new', {
            product: product,
            errorMessage: "Erreur lors de la création du produit"
        })
    }
})

//function removeProductCover(fileName) {
//    fs.unlink(path.join(uploadPath, fileName), err => {
//        if (err) console.error(err)
//    })
//}

function saveCover(product, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        product.coverImage = new Buffer.from(cover.data, 'base64')
        product.coverImageType = cover.type
    }
}

module.exports = router
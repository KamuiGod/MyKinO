const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Products = require('../models/products')
const uploadPath = path.join('public', Products.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

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
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const product = new Products({
        name: req.body.name,
        referenceID: req.body.referenceID,
        price: req.body.price,
        coverImage: fileName,
        description: req.body.description,
    })
    try {
        const newProduct = await product.save()
        //res.redirect(`products/${newProducts.id}`)
        res.redirect('/products')
    } catch {
        if (product.coverImage != null) {
            removeProductCover(product.coverImage)
        }
        res.render('products/new', {
            product: product,
            errorMessage: "Erreur lors de la création du produit"
        })
    }
})

function removeProductCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

module.exports = router
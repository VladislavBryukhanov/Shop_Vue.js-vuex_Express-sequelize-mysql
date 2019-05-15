const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const productsCotroller = require('../controllers/products');

const fileQuotas = require('../common/constants').fileQuotas;
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join( __dirname + '/../', 'public/preview_photo/'))
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v1() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: fileQuotas.IMAGE_MAX_SIZE
    }
});

router.get('/categories', categoriesController.fetchCategories);

router.get('/categories/:offset&:limit', categoriesController.fetchCategoriesPaginated);

router.get('/products', productsCotroller.fetchProduct);

router.post('/add_products', upload.single('attachedPhoto'), productsCotroller.addProduct);

module.exports = router;

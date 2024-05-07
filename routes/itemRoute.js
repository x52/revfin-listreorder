const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const verifyToken = require('../middlewares/verifyToken');

//router.use(verifyToken);

// Routes for CRUD operations
router.post('/add', itemController.createItem);
router.get('/getall', itemController.getItems);
router.put('/update/:id', itemController.updateItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const errorHandler = require('../middlewares/errorHandler');
const validateRequest = require('../middlewares/validationHandler');
const { registerUser, loginUser } = require('../controller/userController');

//validation middleware for user creation
const createUserValidation = [
    body('name').notEmpty(),
    body('username').notEmpty(), // Adding validation for username
    body('password').isLength({ min: 6 }) // Adding validation for password (minimum length)
];


router.post('/register',
//createUserValidation, 
//validateRequest, 
registerUser);

router.post('/login', loginUser);


module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/api/all/Users', auth.authenticate(), userController.getAllUsers);
router.get('/api/id/Users/:id', auth.authenticate(), userController.getUserById);
router.patch('/api/patch/Users/:id', auth.authenticate(), userController.updateUser);
router.post('/api/create/user', userController.createUser);
router.delete('/api/delete/user/:id', userController.deleteUser);
router.post('/register', userController.register);
router.post('/login', userController.login);



module.exports = router
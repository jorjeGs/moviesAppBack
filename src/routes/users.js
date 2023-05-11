const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, updateUser, getUser } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

    //http://localhost:4000/api/users/1
router.route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
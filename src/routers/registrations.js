const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    // Get the username and password from request body
    const { username, password } = req.body
    
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hshPassword = await bcrypt.hash(password, 8)
    // Save the user using the prisma user model, setting their password to the hashed version
    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hshPassword
        }
    })
    const {id} = createdUser
    const response = {id, username}
    // Respond back to the client with the created users username and id
    res.status(201).json({ user: response })
});

module.exports = router;

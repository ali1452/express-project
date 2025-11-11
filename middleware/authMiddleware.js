const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../modals/userModal')

const JWT_SECRET = process.env.JWT_SECRET || 'express-learning-secret'

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('authorization header missing or invalid')
        return res.status(401).json({
            success: false,
            message: 'not authorized, token missing'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')

        if (!user) {
            console.log('user not found for token payload id', decoded.id)
            return res.status(401).json({
                success: false,
                message: 'not authorized, user not found'
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log('token verification failed', error.message)
        return res.status(401).json({
            success: false,
            message: 'not authorized, token invalid'
        })
    }
})

module.exports = authMiddleware
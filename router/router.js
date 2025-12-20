const express = require('express')
const { getUser,createUser,loginUser,updateUser,deleteUser, getSingleUser } = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

const app = express()
const route = express.Router()
express.json()

// Public routes (no authentication required)
route.post('/',(req,res)=>createUser(req,res))

route.post('/login',(req,res)=>loginUser(req,res))

// Protected routes (require JWT authentication)
route.get('/',(req,res,next)=>authMiddleware(req,res,next),(req,res)=>getUser(req,res))

route.get('/:id',(req,res,next)=>authMiddleware(req,res,next),(req,res)=>getSingleUser(req,res))

route.patch('/:id',(req,res,next)=>authMiddleware(req,res,next),(req,res)=>updateUser(req,res))

route.delete('/:id',(req,res,next)=>authMiddleware(req,res,next),(req,res)=>deleteUser(req,res))

module.exports = route
const express = require('express')
const { getUser,createUser,updateUser,deleteUser, getSingleUser } = require('../controller/userController')

const app = express()
const route = express.Router()
express.json()


route.get('/',(req,res)=>getUser(req,res))

route.get('/:id',(req,res)=>getSingleUser(req,res))

route.post('/',(req,res)=>createUser(req,res))

route.patch('/:id',(req,res)=>updateUser(req,res))

route.delete('/:id',(req,res)=>deleteUser(req,res))

module.exports = route
const express = require('express')
const { getFavorites, addFavorite } = require('../controller/favoriteController')
const authMiddleware = require('../middleware/authMiddleware')

const app = express()
const route = express.Router()
express.json()

route.use((req,res,next)=>authMiddleware(req,res,next))

route.get('/',(req,res)=>getFavorites(req,res))

route.post('/',(req,res)=>addFavorite(req,res))


module.exports = route
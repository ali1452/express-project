
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../modals/userModal')

const JWT_SECRET = process.env.JWT_SECRET || 'express-learning-secret'


const getUser= asyncHandler(async (req, res, next) => {
        // console.log('get request successfully',req.query.first_name)
        const user = await User.find().select('-password')
        res.status(200).json({
            success: true,
            data: user
        })
    })

    const getSingleUser = asyncHandler(async (req,res)=>{
        
        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if(!user){
            console.log('user not found for id', id)
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })


    })

    const createUser= asyncHandler(async (req, res, next) => {
        console.log('registration request',req.body)
        const { first_name, last_name, email, password } = req.body

        if(!first_name || !last_name || !email || !password){
            console.log('first_name, last_name, email and password are required')
            return res.status(400).json({
                success: false,
                message: 'first_name, last_name, email and password are required'
            })
        }

        try {
            const existingUser = await User.findOne({ email })
            if(existingUser){
                console.log('user already exists with this email')
                return res.status(409).json({
                    success: false,
                    message: 'user already exists'
                })
            }

            const user = await User.create({
                first_name,
                last_name,
                email,
                password
            })

            const userResponse = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }

            res.status(201).json({
                success: true,
                data: userResponse
            })        
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
        
    })

    const loginUser = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body
        console.log('login request', email)

        if(!email || !password){
            console.log('email and password are required for login')
            return res.status(400).json({
                success: false,
                message: 'email and password are required'
            })
        }

        try {
            const user = await User.findOne({ email })
            if(!user){
                console.log('invalid credentials for email', email)
                return res.status(401).json({
                    success: false,
                    message: 'invalid email or password'
                })
            }

            const isMatch = await user.comparePassword(password)
            if(!isMatch){
                console.log('invalid password for email', email)
                return res.status(401).json({
                    success: false,
                    message: 'invalid email or password'
                })
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            )

            const userResponse = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }

            res.status(200).json({
                success: true,
                data: {
                    token,
                    user: userResponse
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    })

    const updateUser = asyncHandler(async (req, res, next) => {
        console.log('update request',req.body,req.params.id)
        const id = req.params.id
        const{first_name, last_name} = req.body
        const user = await User.findByIdAndUpdate(id,{
            first_name,
            last_name
        },[overwrite=true])
        res.status(202).json(user)
    })

    const deleteUser = asyncHandler(async (req, res, next) => {
        console.log('delete user',req.params.id)
        const id = req.params.id
        const{first_name, last_name} = req.body
        res.json({"message":"delete successfully"})
        const user = await User.findByIdAndDelete(id)
        res.status(204).json(user)
    })


    module.exports  ={getUser,getSingleUser,createUser,loginUser,updateUser,deleteUser}

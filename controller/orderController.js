
const asyncHandler = require('express-async-handler')
const Order = require('../modals/orderModal')


const getOrder= asyncHandler(async (req, res, next) => {
        console.log('get  order request')
        const order = await Order.find()
        res.status(200).json(order)
    })

    const getSingleUser = asyncHandler(async (req,res)=>{
        
        const id = req.params.id
        const order = await Order.findby(id)
        res.status(200).json(order)


    })

    // const createUser= asyncHandler(async (req, res, next) => {
    //     console.log('create order',req.body)
    //     const{first_name, last_name} = req.body
    //     try {
    //         if(first_name && last_name){
    //             const user = await User.create({
    //                 first_name,
    //                 last_name
    //             })
    //             res.status(201).json(user)        
    //         }else{
    //             console.log('first or last name is required')
    //         }
            
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // })

    // const updateUser = asyncHandler(async (req, res, next) => {
    //     console.log('update request',req.body,req.params.id)
    //     const id = req.params.id
    //     const{first_name, last_name} = req.body
    //     const user = await User.findByIdAndUpdate(id,{
    //         first_name,
    //         last_name
    //     },[overwrite=true])
    //     res.status(202).json(user)
    // })

    // const deleteUser = asyncHandler(async (req, res, next) => {
    //     console.log('delete order',req.params.id)
    //     const id = req.params.id
    //     const{first_name, last_name} = req.body
    //     res.json({"message":"order delete successfully"})
    //     const user = await User.findByIdAndDelete(id)
    //     res.status(204).json(user)
    // })


    module.exports  ={getOrder}

import userModel from '../models/userModel.js'
import authUser from '../middleware/auth.js'

const addToCart = async(req, res) => {
    try {
        const userId = req.body.userId // Get userId from auth middleware
        const {itemId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {}; // Remove await and add fallback

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            success: true,
            message: "Added to cart"
        })

    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async(req, res) => {
    try {
        const userId = req.body.userId // Get userId from auth middleware
        const {itemId, quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {} // Remove await and add fallback

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({
            success: true,
            message: "Cart Updated" 
        })

    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getUserCart = async(req, res) => {
    try {
        const userId = req.body.userId // Get userId from auth middleware
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {}; // Remove await and add fallback

        res.json({
            success: true,
            cartData
        })

    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}  

export {addToCart, updateCart, getUserCart}
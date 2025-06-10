import express from 'express'
import authUser from '../middleware/auth.js';
import { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, allOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'


const orderRouter = express.Router()

// admin routes - Changed POST to GET for listing orders (RESTful)
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment routes
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user routes
orderRouter.post('/userorders', authUser, userOrders)

// verify Payment 

orderRouter.post('/verifyStripe', authUser,verifyStripe)

export default orderRouter
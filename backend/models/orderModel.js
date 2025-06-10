import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  PaymentMethod: {
    type: String,
    required: true
  },
  payment: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "Ready to ship"
  },
  date: {
    type: Number,
    required: true
  }
});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;

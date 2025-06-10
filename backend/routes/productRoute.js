import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
  toggleStock,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.post("/toggle-stock", adminAuth, toggleStock); 

export default productRouter;

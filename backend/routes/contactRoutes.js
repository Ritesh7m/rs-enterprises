import { Router } from "express";
import { postContact } from "../controllers/contactController.js";

const router = Router();

router.post("/", postContact);

export default router;

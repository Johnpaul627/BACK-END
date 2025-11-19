import express from "express";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);  // <<< MUST NOT HAVE ()

export default router;

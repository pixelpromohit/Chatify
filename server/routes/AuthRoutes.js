import { Router } from "express";
import { signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";
import { getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

// Define the signup route
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get('/user-info', verifyToken, getUserInfo)

export default authRoutes;

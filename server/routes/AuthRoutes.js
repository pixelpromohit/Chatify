import { Router } from "express";
import { signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";

const authRoutes = Router();

// Define the signup route
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

export default authRoutes;

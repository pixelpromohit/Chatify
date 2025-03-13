import { Router } from "express";
import { testUser } from "../controllers/AuthController.js";

const testRoutes = Router();

// Define the signup route
testRoutes.get("/testUser", testUser);

export default testRoutes;

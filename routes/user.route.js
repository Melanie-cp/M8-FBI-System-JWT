import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";

const router = Router()

router.post('/', UserController.login)

router.get('/profile', verifyTokenJWT, UserController.profile)

export default router;
import express from "express";
import { userRegister, userLogin, userLogout, isAuthenticated } from "../controllers/auth.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router()
router.post('/signin', userRegister)
router.post('/login', userLogin)
router.post('/logout', userAuth,userLogout)
router.get('/isAuth', userAuth, isAuthenticated)

export default router

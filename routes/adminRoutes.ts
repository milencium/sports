import { Router } from "express";
const router = Router();

import authVerify from "../middlewares/authVerify";

import { adminLogin } from "../controllers/admins/adminLogin";
import { adminRegister } from "../controllers/admins/adminRegister";
import { getAdmins } from "../controllers/admins/getAdmins";


router.post("/login", adminLogin);
router.post("/register", adminRegister);
router.get("/admins", authVerify, getAdmins);


export default router;
import { Router } from "express";
const router = Router();

import { userRegister } from "../controllers/users/userRegister";
import { userLogin } from "../controllers/users/userLogin";
import { getUsers } from "../controllers/users/getUsers";
import authVerify from "../middlewares/authVerify"

import { deleteUser } from "../controllers/users/deleteUser";


router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/:id", authVerify, getUsers);
router.delete("/:id", authVerify, deleteUser);

export default router;
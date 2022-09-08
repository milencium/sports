import { Router } from "express";
const router = Router();

import authVerify from "../middlewares/authVerify";
import { createReservation } from "../controllers/reservations/createReservation";
import { deleteReservation } from "../controllers/reservations/deleteReservation";

router.post("/createReservation", authVerify, createReservation);
router.delete("/deleteReservation", authVerify, deleteReservation);


export default router;
import { Router } from "express";
const router = Router();

import { addSport } from "../controllers/sports/addSport";
import { deleteSport } from "../controllers/sports/deleteSport";
import { updateSport } from "../controllers/sports/updateSport";
import { getSports } from "../controllers/sports/getSports";

router.post("/addSport", addSport);
router.post("/deleteSport", deleteSport);
router.put("/updateSport", updateSport);
router.get("/getSport", getSports);

export default router;
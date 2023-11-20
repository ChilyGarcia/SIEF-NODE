import { Router } from "express";
import { newInfo, newAudit, getInfo, getAudits, getInfoFiveYears} from "../controllers/info.controller.js";

const router = new Router();

router.post("/api/new-information", newInfo);
router.get("/api/all-info", getInfo);
router.post("/api/new-audit", newAudit);
router.get("/api/all-audit", getAudits)
router.post("/api/info-fiveyears", getInfoFiveYears)

export default router;

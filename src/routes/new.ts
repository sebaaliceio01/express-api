import { Router } from "express";
import NewController from "../controller/NewController";

const router = Router()

router.get("/", NewController.getAll)
router.get("/:id", NewController.getNewById)
router.post("/", NewController.createNew)


export default router
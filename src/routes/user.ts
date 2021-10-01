import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// Get all
router.get("/", UserController.getAllUsers);
//Get One
router.get("/:id", UserController.getUserById);
//create user
router.post("/", UserController.createUser);
//edit user
router.patch("/:id", UserController.updateUser);
//delete user
router.delete("/:id", UserController.deleteUser);

export default router;

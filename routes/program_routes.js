import express from "express";
import programController from "../controllers/programController.js";
import upload from "../middlewar/upload.middleware.js"

const router = express.Router();

router.route("/").get(programController.getAll);
router.route("/:id").get(programController.getProgram);
router.route("/:id").put(programController.updateProgram);
router.route("/:id").delete(programController.eraseProgram);
router.route("/").post(upload.single('image'), programController.postProgram);




export default router;



































// router.route("/").post(upload.single("image") , programController.postProgram);

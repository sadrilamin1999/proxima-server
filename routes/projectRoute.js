const express = require("express");
const {
  postProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");
const requireAuth = require("../middlewares/requireAuth");

// router

const router = express.Router();
router.use(requireAuth);

// get all projects
router.get("/", getAllProjects);

// get single projects
router.get("/:id", getSingleProject);

// post a new projects
router.post("/", postProject);

// delete a projects
router.delete("/:id", deleteProject);

// update a new projects
router.patch("/:id", updateProject);

module.exports = router;

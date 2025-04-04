const route = require("express").Router();
const uploadCloud = require("../controllers/middlewareCloudinary");
const PostControllers = require("../controllers/postControllers");

route.post("/create", uploadCloud.single("imageTitle"), PostControllers.createPost);
route.get("/", PostControllers.getAllPost)
route.delete("/:id", PostControllers.deletePost)
module.exports = route;
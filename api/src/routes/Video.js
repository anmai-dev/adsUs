const route = require('express').Router();
const videoControllers = require("../controllers/videoControllers")
const middlewareVerify = require('../controllers/middlewareControllers')


// create Video
route.post("/", middlewareVerify.verifyTokenAdmin, (req, res, next) => {
    console.log("req.body:", req.body); // Kiểm tra dữ liệu từ client
    console.log("req.files:", req.files); // Kiểm tra file tải lên
    next();
}, videoControllers.createVideo);
// getAllVideo
route.get("/", videoControllers.getAllVideo)
// deleteVideo
route.delete("/:id", middlewareVerify.verifyTokenAdmin, videoControllers.deleteVideo)


module.exports = route
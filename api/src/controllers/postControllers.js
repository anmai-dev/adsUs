const Post = require("../models/Posts");

const PostControllers = {
    createPost: async (req, res) => {
        try {
            console.log("--- request body ---", req.body);
            console.log("--- request file ---", req.file);
            
            const { title, content } = req.body;
            
            // Kiểm tra file từ multer (nếu dùng middleware Cloudinary)
            const imageUrl = req.file ? req.file.path : null;
            
            if (!imageUrl) {
                console.log("Không tìm thấy file ảnh trong request");
                return res.status(400).json({ message: "Không có file ảnh được upload." });
            }

            console.log("URL ảnh từ Cloudinary:", imageUrl);

            const newPost = new Post({
                title: title,
                content: content,
                image: imageUrl,
            });

            const savedPost = await newPost.save();
            console.log("Bài viết đã được lưu:", savedPost);
            res.status(200).json(savedPost);
        } catch (error) {
            console.error("Error saving post:", error);
            res.status(500).json({ message: "Lỗi khi lưu bài viết", error: error.message });
        }
    },
    getAllPost: async (req, res) => {
        try {
            const allPost = await Post.find()
            res.status(200).json(allPost)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deletePost: async (req, res) => {
        try {
           await Post.findByIdAndDelete(req.params.id)
           res.status(200).json("Đã xóa bài báo!")
        } catch (error) {
            res.status(500).json("lỗi khi xóa bài báo!")
        }
    }
};

module.exports = PostControllers;
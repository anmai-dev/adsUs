const Link = require('../models/Link')

const LinkControllers = {
    createLink: async (req, res) => {
        try {
            console.log("Received request body:", req.body);
            
            const { url, title, description } = req.body;
            
            if (!url) {
                return res.status(400).json({
                    message: "URL là bắt buộc"
                });
            }

            const newLink = new Link({
                url,
                title,
                description
            });

            console.log("Creating new link:", newLink);

            const savedLink = await newLink.save();
            console.log("Link saved successfully:", savedLink);

            res.status(200).json(savedLink);
        } catch (error) {
            console.error("Error creating link:", error);
            res.status(500).json({
                message: "Lỗi khi tạo liên kết",
                error: error.message
            });
        }
    },
    getLink: async (req, res) => {
        try {
            const links = await Link.findById(req.params.id)
            res.status(200).json(links)
            
        } catch (error) {
            res.status(500).json({
                message: "Lỗi khi lấy liên kết",
                error: error.message
            })
        }
    },
    getAllLink: async (req, res) => {
        try {
            const allLink = await Link.find()
            res.status(200).json(allLink)
        } catch (error) {
           res.status(500).json({
            message: "Lỗi khi lấy tất cả liên kết",
            error: error.message
           })
        }
    }       
}

module.exports = LinkControllers;

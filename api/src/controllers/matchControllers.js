const Match = require('../models/Match');
const cloudinary = require('cloudinary').v2;  // Đảm bảo import cloudinary ở đây
const uploadCloud = require('./middlewareCloudinary');
const path = require('path');
const fs = require('fs');

const matchControllers = {
    creatMatch: async (req, res) => {
        try {
            console.log("Add match - Request body:", req.body);
            console.log("Add match - Request files:", req.files);
            
            const { team1, team2, matchTime, cupType } = req.body;

            // Kiểm tra các trường bắt buộc
            if (!team1 || !team2 || !matchTime) {
                return res.status(400).json({ message: 'Missing required fields (team1, team2, or matchTime)' });
            }

            let team1LogoPath = null;
            let team2LogoPath = null;

            // Kiểm tra xem có files không
            if (!req.files) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            // Xử lý logo đội 1
            if (req.files.team1Logo) {
                const team1Logo = req.files.team1Logo;
                
                try {
                    // Upload lên Cloudinary thay vì lưu cục bộ
                    const result = await cloudinary.uploader.upload(team1Logo.tempFilePath, {
                        folder: 'image_video_project/team_logos',
                        resource_type: 'image'
                    });
                    team1LogoPath = result.secure_url; // Lưu URL Cloudinary
                    console.log(`Team 1 logo uploaded to Cloudinary: ${team1LogoPath}`);
                    
                    // Xóa file tạm
                    if (fs.existsSync(team1Logo.tempFilePath)) {
                        fs.unlinkSync(team1Logo.tempFilePath);
                    }
                } catch (fileError) {
                    console.error("Error uploading team1 logo to Cloudinary:", fileError);
                    return res.status(500).json({ 
                        message: "Error uploading team1 logo to Cloudinary", 
                        error: fileError.toString() 
                    });
                }
            } else {
                return res.status(400).json({ message: 'Team 1 logo is required' });
            }

            // Xử lý logo đội 2
            if (req.files.team2Logo) {
                const team2Logo = req.files.team2Logo;
                
                try {
                    // Upload lên Cloudinary thay vì lưu cục bộ
                    const result = await cloudinary.uploader.upload(team2Logo.tempFilePath, {
                        folder: 'image_video_project/team_logos',
                        resource_type: 'image'
                    });
                    team2LogoPath = result.secure_url; // Lưu URL Cloudinary
                    console.log(`Team 2 logo uploaded to Cloudinary: ${team2LogoPath}`);
                    
                    // Xóa file tạm
                    if (fs.existsSync(team2Logo.tempFilePath)) {
                        fs.unlinkSync(team2Logo.tempFilePath);
                    }
                } catch (fileError) {
                    console.error("Error uploading team2 logo to Cloudinary:", fileError);
                    return res.status(500).json({ 
                        message: "Error uploading team2 logo to Cloudinary", 
                        error: fileError.toString() 
                    });
                }
            } else {
                return res.status(400).json({ message: 'Team 2 logo is required' });
            }

            // Tạo mới trận đấu với URL Cloudinary
            const newMatch = new Match({
                team1: team1,
                team2: team2,
                team1Logo: team1LogoPath, // URL Cloudinary
                team2Logo: team2LogoPath, // URL Cloudinary
                matchTime: new Date(matchTime),
                cupType: cupType || 'Chưa có giải đấu'
            });

            // Lưu vào database
            const match = await newMatch.save();
            console.log("Match saved successfully:", match);
            return res.status(200).json(match);
        } catch (error) {
            console.error("Error creating match:", error);
            return res.status(500).json({ 
                message: "Error creating match", 
                error: error.toString(),
                stack: error.stack
            });
        }
    },

    getAllMatch: async (req, res) => {
        try {
            console.log("Đang lấy danh sách trận đấu");
            // Lấy tất cả trận đấu, sắp xếp theo thời gian trận đấu (từ gần nhất đến xa nhất)
            const allMatch = await Match.find()
                .sort({ matchTime: 1 }) // 1 là tăng dần (sắp xếp từ trận sớm nhất đến muộn nhất)
                .exec();
            
            console.log(`Đã tìm thấy ${allMatch.length} trận đấu`);
            return res.status(200).json(allMatch);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách trận đấu:", error);
            return res.status(500).json({
                message: "Lỗi khi lấy danh sách trận đấu",
                error: error.message
            });
        }
    },

    deleteMatch: async (req, res) => {
        try {
            const match = await Match.findById(req.params.id);
            if (!match) {
                return res.status(404).json({ message: 'Match not found' });
            }

            console.log(`Deleting match: ${match._id}`);
            console.log(`- team1Logo: ${match.team1Logo}`);
            console.log(`- team2Logo: ${match.team2Logo}`);

            // Xóa ảnh từ Cloudinary
            try {
                // Nếu URL từ Cloudinary, lấy public_id và xóa
                if (match.team1Logo && match.team1Logo.includes('cloudinary.com')) {
                    // Lấy public ID từ URL Cloudinary (vd: https://res.cloudinary.com/demo/image/upload/v1234567890/image_video_project/team_logos/abcdef.jpg)
                    const publicId = match.team1Logo.split('/').slice(-3).join('/').split('.')[0]; // image_video_project/team_logos/abcdef
                    await cloudinary.uploader.destroy(publicId);
                    console.log(`Deleted team1 logo from Cloudinary: ${publicId}`);
                }
                
                if (match.team2Logo && match.team2Logo.includes('cloudinary.com')) {
                    const publicId = match.team2Logo.split('/').slice(-3).join('/').split('.')[0];
                    await cloudinary.uploader.destroy(publicId);
                    console.log(`Deleted team2 logo from Cloudinary: ${publicId}`);
                }
            } catch (cloudinaryError) {
                console.error('Error deleting images from Cloudinary:', cloudinaryError);
                // Tiếp tục xóa match trong database ngay cả khi không xóa được ảnh
            }

            // Xóa match từ database
            await Match.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Match deleted successfully', id: req.params.id });
        } catch (error) {
            console.error('Error deleting match:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
};

module.exports = matchControllers;
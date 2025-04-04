const Match = require('../models/Match');
const cloudinary = require('cloudinary').v2;
const uploadCloud = require('./middlewareCloudinary')

const matchControllers = {
    creatMatch: async (req, res) => {
        const { team1, team2, matchTime, cupType } = req.body;

        const team1Logo = req.files['team1Logo'][0];
        const team2Logo = req.files['team2Logo'][0];

        if (!team1Logo || !team2Logo) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        if (!team1 || !team2 || !matchTime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMatch = new Match({
            team1: team1,
            team2: team2,
            team1Logo: team1Logo.path,
            team2Logo: team2Logo.path,
            matchTime: matchTime,
            cupType: cupType || 'Chưa có giải đấu'
        });

        try {
            const match = await newMatch.save();
            return res.status(200).json(match);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getAllMatch: async (req, res) => {
        try {
            const allMatch = await Match.find().sort({ matchTime: 1 }); // Sắp xếp theo thời gian tăng dần
            return res.status(200).json(allMatch);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    deleteMatch: async (req, res) => {
        try {
            const match = await Match.findById(req.params.id);
            if (!match) {
                return res.status(404).json({ message: 'Match not found' });
            }

            const getPublicIdFromUrl = (url) => {
                const parts = url.split('/');
                const uploadIndex = parts.indexOf('upload');
                const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
                const publicId = publicIdWithExt.split('.').slice(0, -1).join('.');
                return publicId;
            };

            const team1LogoPublicId = getPublicIdFromUrl(match.team1Logo);
            const team2LogoPublicId = getPublicIdFromUrl(match.team2Logo);

            const result1 = await cloudinary.uploader.destroy(team1LogoPublicId);
            const result2 = await cloudinary.uploader.destroy(team2LogoPublicId);

            if (result1.result !== 'ok' || result2.result !== 'ok') {
                return res.status(500).json({
                    message: 'Failed to delete images from Cloudinary',
                    details: { result1, result2 },
                });
            }

            await Match.findByIdAndDelete(req.params.id);
            return res.status(200).json('Match and images have been deleted successfully');
        } catch (error) {
            console.error('Error deleting match or images:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
};

module.exports = matchControllers; 
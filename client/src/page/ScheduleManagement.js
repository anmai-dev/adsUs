import React, { useState } from 'react';
import './ScheduleManagement.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMatch, ScheduleMatch } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const ScheduleManagement = ({ onClose, onSuccess }) => {
    const token = useSelector((state) => state.auth.login?.currentUser);
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [team1Logo, setTeam1Logo] = useState(null);
    const [team2Logo, setTeam2Logo] = useState(null);
    const [matchTime, setMatchTime] = useState('');
    const [cupType, setCupType] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleSubmitMatch = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('team1', team1);
        formData.append('team2', team2);
        formData.append('matchTime', matchTime);
        formData.append('cupType', cupType);

        if (team1Logo) {
            formData.append('team1Logo', team1Logo);
        }
        if (team2Logo) {
            formData.append('team2Logo', team2Logo);
        }

        try {
            await ScheduleMatch(formData, token?.accessToken, dispatch);
            await getAllMatch(dispatch);
            onSuccess();
            Navigate('/admin/manage-schedule');
        } catch (error) {
            console.error('Lỗi khi thêm trận đấu:', error);
        }
    };

    return (
        <div className="scheduleManagement">
            <h2>Thêm trận đấu</h2>
            <form onSubmit={handleSubmitMatch} encType="multipart/form-data">
                <div className="form">
                    <input
                        type="text"
                        placeholder="Tên đội 1"
                        value={team1}
                        onChange={(e) => setTeam1(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setTeam1Logo(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Tên đội 2"
                        value={team2}
                        onChange={(e) => setTeam2(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setTeam2Logo(e.target.files[0])}
                    />
                    <input
                        type="datetime-local"
                        value={matchTime}
                        onChange={(e) => setMatchTime(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tên giải đấu"
                        value={cupType}
                        onChange={(e) => setCupType(e.target.value)}
                    />
                    <button type="submit">Thêm trận đấu</button>
                    <button type="button" onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleManagement; 
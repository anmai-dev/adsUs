import React, { useState } from 'react';
import MatchList from './MatchList';
import ScheduleManagement from './ScheduleManagement';
import './SchedulePage.scss';

const SchedulePage = () => {
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddMatch = () => {
        setShowAddForm(true);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
    };

    const handleSuccess = () => {
        setShowAddForm(false); // Đóng form và hiển thị lại danh sách trận đấu
    };

    return (
        <div className="schedulePage">
            {showAddForm ? (
                <ScheduleManagement onClose={handleCloseForm} onSuccess={handleSuccess} />
            ) : (
                <MatchList onAddMatch={handleAddMatch} />
            )}
        </div>
    );
};

export default SchedulePage;
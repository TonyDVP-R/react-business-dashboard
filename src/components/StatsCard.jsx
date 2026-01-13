import React from 'react';

const StatsCard = ({ title, value, change, isPositive, icon }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon">
                {icon}
            </div>
            <div className="stats-info">
                <h3 className="stats-title">{title}</h3>
                <p className="stats-value">{value}</p>
                <div className={`stats-change ${isPositive ? 'positive' : 'negative'}`}>
                    <span className="arrow">{isPositive ? '↑' : '↓'}</span>
                    <span className="percent">{change}</span>
                    <span className="label">&nbsp;vs last month</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;

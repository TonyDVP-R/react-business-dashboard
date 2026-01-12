import React from 'react';

const StatChart = ({ data, color = '#4f46e5' }) => {
    // Simple SVG Line Chart generator
    const height = 60;
    const width = 100;
    const max = Math.max(...data);
    const min = Math.min(...data);

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / (max - min)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ height: '60px', width: '100px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Fill Area (Optional) */}
                <polyline
                    fill={color}
                    fillOpacity="0.1"
                    stroke="none"
                    points={`0,${height} ${points} ${width},${height}`}
                />
            </svg>
        </div>
    );
};

export default StatChart;

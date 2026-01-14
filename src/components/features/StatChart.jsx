import React from 'react';

const StatChart = ({ data, color = '#4f46e5' }) => {
    // Simple SVG Line Chart generator
    const height = 60;
    const width = 100;
    if (!data || !Array.isArray(data) || data.length < 2) {
        return <div style={{ height: '60px', width: '100px', background: 'var(--bg-element)', borderRadius: '4px', opacity: 0.5 }} />;
    }

    const max = Math.max(...data);
    const min = Math.min(...data);

    const pathData = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = max === min ? height / 2 : height - ((val - min) / (max - min)) * height;
        return (i === 0 ? 'M' : 'L') + `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path
                    d={pathData}
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d={`${pathData} L ${width},${height} L 0,${height} Z`}
                    fill={color}
                    fillOpacity="0.1"
                    stroke="none"
                />
            </svg>
        </div>
    );
};

export default StatChart;

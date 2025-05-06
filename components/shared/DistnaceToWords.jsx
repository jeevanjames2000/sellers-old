import React from 'react';

const DistanceToWords = ({ value }) => {
    const formatDistance = (distance) => {
        if (distance >= 1000) {
            const kilometers = Math.floor(distance / 1000);
            const meters = distance % 1000;
            return `${kilometers} Km${meters ? ` and ${meters}m` : ''}`;
        }
        return `${distance}m`;
    };

    return (
        <p className="text-[12px]">{formatDistance(Number(value))}</p>
    );
};

export default DistanceToWords;

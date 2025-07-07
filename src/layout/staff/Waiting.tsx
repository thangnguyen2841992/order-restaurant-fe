import React from 'react';

interface WaitingProps {
    isDone?: boolean; // Có thể tùy chọn thông điệp
}

const Waiting: React.FC<WaitingProps> = ({ isDone }) => {
    return (
        <div hidden={!isDone} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={styles.loader}></div>
            <p>Đang upload ảnh</p>
        </div>

    );
};

const styles = {

    loader: {
        border: '8px solid #e0e0e0',
        borderTop: '8px solid #4caf50',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};

export default Waiting;
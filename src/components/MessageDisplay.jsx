import React from 'react';
import { Paper, Typography } from '@mui/material';

const MessageDisplay = ({ messages }) => {
    return (
        <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
                Message Block
            </Typography>
            <div style={{ marginBottom: '20px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <Typography variant="body1" component="span" style={{ fontWeight: 'bold' }}>User: </Typography>
                        <Typography variant="body1" component="span">{message}</Typography>
                    </div>
                ))}
            </div>
        </Paper>
    );
};

export default MessageDisplay;

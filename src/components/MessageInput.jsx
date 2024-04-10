import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MessageInput = ({ onAddMessage }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [userName, setUserName] = useState('');

    const handleAddMessage = () => {
        if (currentMessage.trim() !== '') {
            onAddMessage(`${userName}: ${currentMessage}`);
            setCurrentMessage('');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', textAlign: 'right' }}>
            <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <TextField
                fullWidth
                label="Type your message"
                variant="outlined"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" onClick={handleAddMessage}>Send</Button>
        </div>
    );
};

export default MessageInput;

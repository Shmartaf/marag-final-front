import React, { useState } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const MessageBlock = () => {
    const [messages, setMessages] = useState([]);

    const handleAddMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div>
            <MessageDisplay messages={messages} />
            <MessageInput onAddMessage={handleAddMessage} />
        </div>
    );
};

export default MessageBlock;


// Message.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ text, sender, isGeminiReply }) => {
  const messageStyle = {
    maxWidth: '70%',
    marginBottom: '10px',
    padding: '10px 15px',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    borderRadius: '10px',
    alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end',
    backgroundColor: sender === 'bot' ? '#e0e0e0' : '#007bff',  // Default for bot and user
  };

  // Apply a different background color for Gemini replies
  if (isGeminiReply) {
    messageStyle.backgroundColor = '#dff0d8'; // Greenish background for Gemini replies
  }

  return (
    <Box style={messageStyle}>
      <Typography style={{ fontSize: '14px', color: sender === 'bot' ? '#000' : '#fff' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Message;

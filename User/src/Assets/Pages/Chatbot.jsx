// Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Button, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import Message from '../Features_component/Chatbot/Message';
import StepContent from '../Features_component/Chatbot/StepContent';
import { Chatboat } from '../Actions/Chatboat';

const Chatbot = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [budget, setBudget] = useState('');
  const [states, setStates] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const isLaptop = useMediaQuery('(min-width:600px)');
  const messageContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const toggleChatBox = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (messageContainerRef.current && isAtBottomRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      isAtBottomRef.current = scrollHeight - scrollTop === clientHeight;
    }
  };

  const handlePlanTrip = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Backend_url}/Get_all_State_names`);
      const stateNames = response.data.map(state => state.state_name);
      setStates(stateNames);
      setMessages((prevMessages) => [
        { text: 'Select a state for your trip', sender: 'bot' },
        ...prevMessages,
      ]);
      setStep(2);
    } catch (error) {
      setMessages((prevMessages) => [
        { text: 'Error fetching states. Please try again.', sender: 'bot' },
        ...prevMessages,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setMessages((prevMessages) => [
      { text: `You selected ${state}. Now, choose your budget.`, sender: 'bot' },
      ...prevMessages,
    ]);
    setStep(3);
  };

  const handleBudgetSelect = async (selectedBudget) => {
    setLoading(true);  // Show loading indicator
    setBudget(selectedBudget);
    setMessages((prevMessages) => [
      { text: `Your budget is ₹${selectedBudget}. Processing your trip...`, sender: 'bot' },
      ...prevMessages,
    ]);

    try {
      const res = await axios.get(`${Backend_url}/Get_place_by_state_name`, { params: { selectedState } });
      const places = res.data;
      const state = selectedState;

      // Call Chatboat to get the Gemini response
      const reply_of_gemini = await Chatboat({ state, places, selectedBudget });

      // Extract the content of the response
      const geminiReply = reply_of_gemini?.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendations available.";

      // Clean the Gemini reply
      const cleanedReply = geminiReply.replace(/\*\*/g, '');  // Remove `**` characters

      // Split the cleaned Gemini reply into individual options
      const options = cleanedReply.split("\n\n"); // Split by blank lines between each option

      // Format the options to display with a different background color for Gemini's response
      const formattedMessages = options.map(option => ({
        text: option,
        sender: 'bot',
        isGeminiReply: true,  // Mark this message as a Gemini reply
      }));

      // Display the formatted Gemini messages
      setMessages((prevMessages) => [
        ...formattedMessages,
        ...prevMessages,
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        { text: 'Error fetching places. Please try again.', sender: 'bot' },
        ...prevMessages,
      ]);
    } finally {
      setLoading(false);  // Hide loading indicator
    }

    setStep(1);
  };

  const handleGoHome = () => {
    setStep(1);
    setMessages([]);
  };

  return (
    <>
      {isLaptop && (
        <div>
          <IconButton
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: '#00bcd4',
              borderRadius: '50%',
              color: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              zIndex: 999,
            }}
            onClick={toggleChatBox}
          >
            <ChatIcon />
          </IconButton>

          {open && (
            <Box
              style={{
                position: 'fixed',
                bottom: 70,
                right: 20,
                width: '350px',
                height: '450px',
                backgroundColor: '#f7f7f7',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 999,
              }}
            >
              <div
                style={{
                  flex: 1,
                  overflowY: 'scroll',
                  marginBottom: '15px',
                  paddingRight: '10px',
                  display: 'flex',
                  flexDirection: 'column-reverse', // This aligns messages from bottom to top
                }}
                ref={messageContainerRef}
                onScroll={handleScroll}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{
                    marginBottom: '10px',
                    fontSize: '18px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                  }}
                >
                  Trip Planning Assistant
                </Typography>
                {messages.map((message, index) => (
                  <Message key={index} text={message.text} sender={message.sender} isGeminiReply={message.isGeminiReply} />
                ))}
                {loading && (
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      Loading...
                    </Typography>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StepContent
                  step={step}
                  states={states}
                  selectedState={selectedState}
                  handleStateSelect={handleStateSelect}
                  handleBudgetSelect={handleBudgetSelect}
                  handlePlanTrip={handlePlanTrip}
                />
                <Button
                  onClick={handleGoHome}
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '20px' }}
                >
                  Go Home
                </Button>
              </div>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

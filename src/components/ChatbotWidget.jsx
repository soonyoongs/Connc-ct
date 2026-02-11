import React from 'react';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const ChatbotWidget = ({ onClose }) => {
    const [chatHistory, setChatHistory] = React.useState([]);

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setChatHistory(prev =>
                [...prev.filter(msg => msg.text !== '...'), { role: 'model', text }]
            );
        };

        const formattedHistory = history.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': process.env.REACT_APP_API_KEY
            },
            body: JSON.stringify({ contents: formattedHistory }),
        };

        try {
            const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
            const responseText = await response.text();

            console.log("Raw API response:", responseText);

            const data = JSON.parse(responseText);
            console.log("Parsed API response:", data);
            const candidate = data.candidates?.[0];

            let botText = '';

            if (candidate?.content?.parts?.[0]?.text) {
                botText = candidate.content.parts[0].text;
            } else if (candidate?.content?.text) {
                botText = candidate.content.text;
            } else if (candidate?.contents?.parts?.[0]?.text) {
                botText = candidate.contents.parts[0].text;
            } else {
                console.warn("Could not find bot response text in candidate:", candidate);
                botText = "Sorry, I couldn't understand the response.";
            }

            botText = botText.replace(/\*\*(.*?)\*\*/g, '$1');
            updateHistory(botText);

        } catch (error) {
            console.error("Error fetching API:", error);
            updateHistory("Sorry, something went wrong while fetching the response.");
        }
    };

    return (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-200 flex flex-col border-2 border-gray-300 shadow-2xl rounded-lg z-50">
            <div className="w-full bg-slate-600 flex items-center justify-between px-6 py-4 rounded-t-lg shadow-xl">
                <h2 className='text-white text-lg font-semibold'>Chatbot</h2>
                <button
                    onClick={onClose}
                    className='text-white hover:text-gray-300 text-2xl font-bold leading-none'
                >
                    ×
                </button>
            </div>

            <div className="w-full flex-1 p-6 space-y-4 overflow-y-auto">
                <div className='flex items-start text-start'>
                    <p className='text-gray-700 p-4 px-6 bg-blue-100 text-sm shadow-xl rounded'>
                        Hello! How can I help you today?
                    </p>
                </div>
                {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} chat={chat} />
                ))}
            </div>

            <div className='border-t border-blue-100 p-4 rounded-b-lg bg-gray-50'>
                <ChatForm
                    chatHistory={chatHistory}
                    setChatHistory={setChatHistory}
                    generateBotResponse={generateBotResponse}
                />
            </div>
        </div>
    );
};

export default ChatbotWidget;
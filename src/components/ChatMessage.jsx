import React from 'react';

const ChatMessage = ({ chat }) => {
    const isBot = chat.role === 'model';

    return (
        <div className={`flex space-x-3 items-start my-2 ${isBot ? 'justify-start' : 'justify-end ml-auto'}`}>
            <div className={`px-6 p-4 py-3 rounded-lg shadow-xl max-w-full break-words ${
                isBot
                    ? 'bg-blue-100 text-blue-900 rounded-tl-none'
                    : 'bg-purple-600 text-white rounded-tr-none'
            }`}>
                <p className='text-sm whitespace-pre-wrap'>{chat.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
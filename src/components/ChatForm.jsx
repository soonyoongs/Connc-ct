import React from 'react';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = React.useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if (!userMessage) return;
        console.log("User message:", userMessage);
        inputRef.current.value = '';
        setChatHistory(history => [...history,{ role: 'user', text: userMessage }]);

        setTimeout(() => {
            setChatHistory(history => [...history, { role: 'model', text: "..."}]);

            generateBotResponse([...chatHistory,{role:'user', text: userMessage}]);},600);
    }


    return(
        <form className='flex items-center space-x-2 p-2 border-t bg-white rounded-b-lg shadow-xl' onSubmit={handleFormSubmit}>
            <input
                ref={inputRef}
                type="text"
                className="p-2 flex-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
            />
            <button className="material-symbols-outlined p-[6px]">keyboard_arrow_up</button>
        </form>
    )
}

export default ChatForm;
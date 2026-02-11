import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/user-blue-gradient.png";
import activities from "../assets/images/community.png";
import findpeers from "../assets/images/chat.png";
import ChatbotWidget from "./ChatbotWidget";

export default function Home() {
    const [message] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const navigate = useNavigate();

    const go = (path) => navigate(path);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40}}>
            <h1>Welcome</h1>
            <p style={{color: '#666'}}>{message}</p>
            <div style={{display: 'flex', gap: 12, marginTop: 24}}>
                <button onClick={() => go('/profile')} style={{padding: '10px 16px'}}>
                    <img src={profile} alt="Profile" style={{width: 20, height: 20, marginRight: 8}} />
                    Profile
                </button>

                <button onClick={() => go('/activities')} style={{padding: '10px 16px'}}>
                    <img src={activities} alt="Activities" style={{width: 20, height: 20, marginRight: 8}} />
                    Activities
                </button>

                <button onClick={() => go('/find-peers')} style={{padding: '10px 16px'}}>
                    <img src={findpeers} alt="Find Peers" style={{width: 20, height: 20, marginRight: 8}} />
                    Find Peers
                </button>
            </div>

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className='fixed bottom-6 right-6 bg-teal-700 text-white p-4 rounded-full shadow-2xl hover:bg-teal-800 transition-all z-50'
            >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                </svg>
            </button>

            {/* Chatbot Widget */}
            {isChatOpen && (
                <ChatbotWidget onClose={() => setIsChatOpen(false)} />
            )}
        </div>
    )
}
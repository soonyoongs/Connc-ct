import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/user-blue-gradient.png";
import activities from "../assets/images/community.png";
import findpeers from "../assets/images/chat.png";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navigation Bar */}
            <nav style={{
                backgroundColor: '#F4C430',
                padding: '16px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Connc:ct</div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button onClick={() => navigate('/auth/LogIn')} style={{ padding: '6px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: '#333' }}>Log In</button>
                    <button onClick={() => navigate('/auth/SignUp')} style={{ padding: '6px 16px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>Sign Up</button>
                </div>
            </nav>

            {/* Feature Cards Section */}
            <div style={{ padding: '40px 40px', backgroundColor: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Profile Card */}
                    <div onClick={() => navigate('/profile')} style={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '32px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                        <img src={profile} alt="Profile" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>PROFILE</h3>
                    </div>

                    {/* Activities Card */}
                    <div onClick={() => navigate('/activities')} style={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '32px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                        <img src={activities} alt="Activities" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>ACTIVITIES</h3>
                    </div>

                    {/* Community Card */}
                    <div onClick={() => navigate('/find-peers')} style={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '32px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                        <img src={findpeers} alt="Community" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>COMMUNITY</h3>
                    </div>
                </div>

                {/* Chat Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        style={{
                            backgroundColor: '#0d9488',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#0f766e';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#0d9488';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <svg style={{ width: '24px', height: '24px' }} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Chatbot Widget */}
            {isChatOpen && (
                <ChatbotWidget onClose={() => setIsChatOpen(false)} />
            )}
        </div>
    )
}

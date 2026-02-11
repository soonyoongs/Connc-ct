import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import profile from "../assets/images/user-blue-gradient.png";
import activities from "../assets/images/community.png";
import findpeers from "../assets/images/chat.png";


export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user);
        });

        return () => subscription?.unsubscribe();
    }, []);

    useEffect(() => {
        // Check if widget is already initialized to prevent duplication
        if (document.querySelector(".goog-te-combo")) {
            return;
        }

        // Initialize Google Translate widget
        window.googleTranslateElementInit = () => {
            if (!document.querySelector(".goog-te-combo")) {
                new window.google.translate.TranslateElement(
                    { pageLanguage: "en", includedLanguages: "en,es,fr,de,zh-CN,ja,ko" },
                    "google_translate_element"
                );
            }
        };

        // Load Google Translate Script if not already loaded
        if (!document.getElementById("google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

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
                    <div id="google_translate_element" style={{ minWidth: '120px' }}></div>
                    {user ? (
                        <>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                                Hi, {user.user_metadata?.name || user.email?.split('@')[0]}
                            </span>
                            <button onClick={handleLogout} style={{ padding: '6px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: '#333' }}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/auth/LogIn')} style={{ padding: '6px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: '#333' }}>Log In</button>
                            <button onClick={() => navigate('/auth/SignUp')} style={{ padding: '6px 16px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>Sign Up</button>
                        </>
                    )}
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

            </div>
        </div>
    )
}

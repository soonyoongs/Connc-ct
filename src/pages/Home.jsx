import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import profile from "../assets/images/user-blue-gradient.png";
import activities from "../assets/images/community.png";
import findpeers from "../assets/images/chat.png";

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [rsvpedActivities, setRsvpedActivities] = useState([]);

    // Reusable styles for feature cards
    const cardStyle = {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '32px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s'
    };

    const activitiesData = [
        { id: 1, title: "Basketball Game", type: "Sports", date: "2025-02-15", time: "19:00", location: "Downtown Court" },
        { id: 2, title: "Music Jam Session", type: "Music", date: "2025-02-16", time: "18:30", location: "Community Center" },
        { id: 3, title: "Art Workshop", type: "Art", date: "2025-02-17", time: "14:00", location: "Creative Studio" },
        { id: 4, title: "Hiking Trip", type: "Travel", date: "2025-02-18", time: "08:00", location: "Mountain Trail" },
        { id: 5, title: "Cooking Class", type: "Cooking", date: "2025-02-19", time: "17:00", location: "Kitchen Studios" },
        { id: 6, title: "Photography Walk", type: "Photography", date: "2025-02-20", time: "10:00", location: "City Downtown" },
    ];

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user);
        });

        const savedRsvps = localStorage.getItem("rsvpedActivities");
        if (savedRsvps) {
            setRsvpedActivities(JSON.parse(savedRsvps));
        }

        const handleStorageChange = () => {
            const savedRsvps = localStorage.getItem("rsvpedActivities");
            if (savedRsvps) {
                setRsvpedActivities(JSON.parse(savedRsvps));
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            subscription?.unsubscribe();
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (document.querySelector(".goog-te-combo")) return;

        window.googleTranslateElementInit = () => {
            if (!document.querySelector(".goog-te-combo")) {
                new window.google.translate.TranslateElement(
                    { pageLanguage: "en", includedLanguages: "en,es,fr,de,zh-CN,ja,ko" },
                    "google_translate_element"
                );
            }
        };

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

    const handleRemoveRsvp = (activityId) => {
        const updated = rsvpedActivities.filter((id) => id !== activityId);
        setRsvpedActivities(updated);
        localStorage.setItem("rsvpedActivities", JSON.stringify(updated));
    };

    // Helper to check auth before navigating
    const handleProtectedNavigation = (path) => {
        if (user) {
            navigate(path);
        } else {
            navigate('/auth/LogIn');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const getRsvpedActivitiesData = () => {
        return activitiesData.filter((activity) => rsvpedActivities.includes(activity.id));
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-4px)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navigation Bar */}
            <nav className="home-nav" style={{ padding: '16px 40px', borderBottom: '1px solid #eee', width: '100%', boxSizing: 'border-box' }}>
                <div className="nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{display:'flex', justifyContent: 'flex-start', alignItems: 'left', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Connc:ct</div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px' }}>
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
                </div>
            </nav>

            {/* Feature Cards Section */}
            <div style={{ padding: '40px 40px', backgroundColor: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {/* Profile Card */}
                    <div 
                        onClick={() => handleProtectedNavigation('/profile')} 
                        style={cardStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={profile} alt="Profile" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>PROFILE</h3>
                    </div>

                    {/* Activities Card */}
                    <div 
                        onClick={() => handleProtectedNavigation('/activities')} 
                        style={cardStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={activities} alt="Activities" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>ACTIVITIES</h3>
                    </div>

                    {/* Community Card */}
                    <div 
                        onClick={() => handleProtectedNavigation('/find-peers')} 
                        style={cardStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={findpeers} alt="Community" style={{ width: '48px', height: '48px', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>COMMUNITY</h3>
                    </div>
                </div>
            </div>

            {/* Booked Activities Section */}
            <div style={{ padding: '0 40px 40px 40px', backgroundColor: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                        Your Upcoming Activities
                    </h3>

                    {getRsvpedActivitiesData().length === 0 ? (
                        <div style={{
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '40px 20px',
                            textAlign: 'center',
                            color: '#999',
                            fontSize: '16px',
                            fontWeight: '500'
                        }}>
                            No activities booked
                        </div>
                    ) : (
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #6d6d6d',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#6acdff4f', borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Activity</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Type</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Date</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Time</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Location</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#121212', fontSize: '14px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getRsvpedActivitiesData().map((activity) => (
                                    <tr 
                                        key={activity.id} 
                                        style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.2s' }} 
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} 
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <td style={{ padding: '12px 16px', color: '#333', fontSize: '14px' }}>{activity.title}</td>
                                        <td style={{ padding: '12px 16px', color: '#333', fontSize: '14px' }}>
                                            <span style={{ backgroundColor: '#e7f3ff', color: '#007bff', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                                                {activity.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#333', fontSize: '14px' }}>{formatDate(activity.date)}</td>
                                        <td style={{ padding: '12px 16px', color: '#333', fontSize: '14px' }}>{formatTime(activity.time)}</td>
                                        <td style={{ padding: '12px 16px', color: '#333', fontSize: '14px' }}>{activity.location}</td>
                                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                            <button 
                                                onClick={() => handleRemoveRsvp(activity.id)} 
                                                style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
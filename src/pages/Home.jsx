import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/user-blue-gradient.png";
import activities from "../assets/images/community.png";
import findpeers from "../assets/images/chat.png";

export default function Home() {
  const [message] = useState("");
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
    </div>
  )
}

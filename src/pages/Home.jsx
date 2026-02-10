import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [message] = useState("");
  const navigate = useNavigate();

  const go = (path) => navigate(path);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40}}>
      <h1>Welcome</h1>
      <p style={{color: '#666'}}>{message}</p>
      <div style={{display: 'flex', gap: 12, marginTop: 24}}>
        <button onClick={() => go('/profile')} style={{padding: '10px 16px'}}>Profile</button>
        <button onClick={() => go('/activities')} style={{padding: '10px 16px'}}>Activities</button>
        <button onClick={() => go('/find-peers')} style={{padding: '10px 16px'}}>Find Peers</button>
      </div>
    </div>
  )
}

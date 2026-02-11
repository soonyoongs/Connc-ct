import React from "react";

export default function Preference() {
  const navigate = useNavigate();

  return (
    <div style={{padding:24}}>
      <h2>Choose Your Hobbies</h2>
      <p>Manage your preferences here.</p>
      <button onClick={() => navigate(-1)} style={{marginTop:12}}>Back</button>
    </div>
  )
}

import { useNavigate } from "react-router-dom";

export default function FindPeers() {
  const navigate = useNavigate();

  return (
    <div style={{padding:24}}>
      <h2>Find Peers</h2>
      <p>Search and connect with peers here.</p>
      <button onClick={() => navigate(-1)} style={{marginTop:12}}>Back</button>
    </div>
  )
}

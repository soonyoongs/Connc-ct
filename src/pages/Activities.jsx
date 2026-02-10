import { useNavigate } from "react-router-dom";

export default function Activities() {
  const navigate = useNavigate();

  return (
    <div style={{padding:24}}>
      <h2>Activities</h2>
      <p>List of activities will appear here.</p>
      <button onClick={() => navigate(-1)} style={{marginTop:12}}>Back</button>
    </div>
  )
}

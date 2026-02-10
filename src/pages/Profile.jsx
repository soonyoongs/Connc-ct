import { useNavigate } from "react-router-dom";

export default function Profile() {
	const navigate = useNavigate();

	return (
		<div style={{padding: 24}}>
			<h2>Your Profile</h2>
			<p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>mm</p>
			<button onClick={() => navigate(-1)} style={{marginTop:12}}>Back</button>
		</div>
	)
}

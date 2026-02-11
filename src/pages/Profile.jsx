import { useNavigate } from "react-router-dom";

export default function Profile() {
	const navigate = useNavigate();

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
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
				<button onClick={() => navigate(-1)} style={{
					padding: '6px 16px',
					backgroundColor: '#fff',
					border: '1px solid #ddd',
					borderRadius: '4px',
					cursor: 'pointer',
					fontSize: '12px',
					fontWeight: '500',
					color: '#333'
				}}>← Back</button>
			</nav>

			{/* Profile Header Section */}
			<div style={{
				backgroundColor: '#f5f5f5',
				padding: '60px 40px',
				textAlign: 'center',
				borderBottom: '1px solid #ddd'
			}}>
				{/* Avatar */}
				<div style={{
					width: '120px',
					height: '120px',
					borderRadius: '50%',
					backgroundColor: '#F4C430',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '0 auto 24px',
					fontSize: '48px',
					fontWeight: 'bold',
					color: '#fff'
				}}>
					JD
				</div>

				{/* Name and Email */}
				<h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>John Doe</h1>
				<p style={{ fontSize: '14px', color: '#666', margin: 0 }}>john.doe@example.com</p>
			</div>

			{/* Main Content Section */}
			<div style={{
				padding: '40px',
				maxWidth: '1000px',
				margin: '0 auto'
			}}>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
					{/* My Information */}
					<div>
						<h2 style={{
							fontSize: '18px',
							fontWeight: '600',
							color: '#333',
							borderBottom: '2px solid #ddd',
							paddingBottom: '12px',
							marginBottom: '24px'
						}}>
							My Information
						</h2>

						<div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #ddd' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
								<p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Name</p>
								<p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>John Doe</p>
							</div>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
								<p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Email</p>
								<p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>john.doe@example.com</p>
							</div>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Member Since</p>
								<p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>January 2024</p>
							</div>
						</div>
					</div>

					{/* My Interests */}
					<div>
						<h2 style={{
							fontSize: '18px',
							fontWeight: '600',
							color: '#333',
							borderBottom: '2px solid #ddd',
							paddingBottom: '12px',
							marginBottom: '24px'
						}}>
							My Interests
						</h2>

						<div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
							<p style={{ fontSize: '14px', color: '#666', margin: '0 0 24px 0' }}>Set your interests</p>
							<button
								onClick={() => navigate('/pref')}
								style={{
									width: '100%',
									padding: '12px 24px',
									backgroundColor: '#F4C430',
									color: '#333',
									border: 'none',
									borderRadius: '4px',
									fontSize: '14px',
									fontWeight: '600',
									cursor: 'pointer',
									transition: 'all 0.2s'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = '#e6b800';
									e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = '#F4C430';
									e.currentTarget.style.boxShadow = 'none';
								}}
							>
								Set Interests
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

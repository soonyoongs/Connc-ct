import { useNavigate } from "react-router-dom";

export default function Profile() {
	const navigate = useNavigate();

	const handleSetPreferences = () => {
		navigate('/pref');
	};

	return (
		<div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Navigation Bar */}
			<nav style={styles.navbar}>
				<div style={styles.navContainer}>
					<div style={styles.logo}>Connc-ct</div>
					<div style={styles.navLinks}>
						<a href="#contact" style={styles.navLink}>Contact</a>
						<a href="#resources" style={styles.navLink}>Resources</a>
						<a href="#community" style={styles.navLink}>Community</a>
						<a href="/activities" style={styles.navLink}>Activity</a>
						<a href="/main" style={styles.navLink}>Home</a>
					</div>
					<div style={styles.navButtons}>
						<button style={styles.loginBtn} onClick={() => navigate('/auth/LogIn')}>Log in</button>
						<button style={styles.signupBtn} onClick={() => navigate('/auth/SignUp')}>Sign Up</button>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main style={styles.mainContent}>
				<div style={styles.profileContainer}>
					{/* Profile Header */}
					<section style={styles.profileHeader}>
						<div style={styles.avatarSection}>
							<div style={styles.avatar}>JD</div>
						</div>
						<h1 style={styles.profileName}>John Doe</h1>
						<p style={styles.profileEmail}>john.doe@example.com</p>
					</section>

					{/* Profile Information Cards */}
					<section style={styles.infoSection}>
						<div style={styles.infoCard}>
						<h3 style={styles.infoTitle}>My Information</h3>
						<div style={styles.infoRow}>
							<label style={styles.infoLabel}>Name</label>
							<p style={styles.infoValue}>John Doe</p>
						</div>
						<div style={styles.infoRow}>
							<label style={styles.infoLabel}>Email</label>
								<p style={styles.infoValue}>john.doe@example.com</p>
							</div>
							<div style={styles.infoRow}>
								<label style={styles.infoLabel}>Member Since:</label>
								<p style={styles.infoValue}>January 2024</p>
							</div>
						</div>

						{/* Preferences Card */}
						<div style={styles.infoCard}>
						<h3 style={styles.infoTitle}>My Interests</h3>
						<p style={styles.preferenceText}>Set your interests</p>
						<button style={styles.preferencesBtn} onClick={handleSetPreferences}>
							Set Interests
							</button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

const styles = {
	// Navbar styles
	navbar: {
		backgroundColor: "#F4C430",
		padding: "16px 0",
		position: "sticky",
		top: 0,
		zIndex: 100,
	},
	navContainer: {
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "0 20px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	logo: {
		fontSize: "24px",
		fontWeight: "bold",
		color: "#333",
		minWidth: "100px",
	},
	navLinks: {
		display: "flex",
		gap: "24px",
		flex: 1,
		justifyContent: "center",
	},
	navLink: {
		textDecoration: "none",
		color: "#333",
		fontSize: "14px",
		fontWeight: "500",
		cursor: "pointer",
		transition: "color 0.3s",
	},
	navButtons: {
		display: "flex",
		gap: "8px",
	},
	loginBtn: {
		padding: "8px 16px",
		backgroundColor: "white",
		border: "1px solid #333",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "14px",
		fontWeight: "500",
		color: "#333",
		transition: "all 0.3s",
	},
	signupBtn: {
		padding: "8px 16px",
		backgroundColor: "#333",
		border: "1px solid #333",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "14px",
		fontWeight: "500",
		color: "white",
		transition: "all 0.3s",
	},

	// Main content
	mainContent: {
		flex: 1,
		backgroundColor: "#F8F8F8",
		padding: "60px 20px",
	},
	profileContainer: {
		maxWidth: "1000px",
		margin: "0 auto",
	},

	// Profile Header
	profileHeader: {
		textAlign: "center",
		marginBottom: "60px",
		padding: "40px",
		backgroundColor: "white",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
	},
	avatarSection: {
		marginBottom: "24px",
	},
	avatar: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		backgroundColor: "#F4C430",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "48px",
		fontWeight: "700",
		color: "white",
		margin: "0 auto",
		boxShadow: "0 4px 12px rgba(244, 196, 48, 0.3)",
	},
	profileName: {
		fontSize: "32px",
		fontWeight: "700",
		margin: "0 0 8px 0",
		color: "#333",
	},
	profileEmail: {
		fontSize: "16px",
		color: "#666",
		margin: "0",
	},

	// Info Section
	infoSection: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		gap: "24px",
	},
	infoCard: {
		backgroundColor: "white",
		padding: "32px",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
	},
	infoTitle: {
		fontSize: "18px",
		fontWeight: "700",
		margin: "0 0 24px 0",
		color: "#333",
		borderBottom: "2px solid #F4C430",
		paddingBottom: "12px",
	},
	infoRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "16px",
		paddingBottom: "12px",
		borderBottom: "1px solid #E0E0E0",
	},
	infoLabel: {
		fontSize: "14px",
		fontWeight: "600",
		color: "#666",
	},
	infoValue: {
		fontSize: "16px",
		color: "#333",
		margin: "0",
		fontWeight: "500",
	},
	preferenceText: {
		fontSize: "14px",
		color: "#666",
		marginBottom: "24px",
		lineHeight: "1.6",
	},
	preferencesBtn: {
		width: "100%",
		padding: "12px 24px",
		backgroundColor: "#F4C430",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "16px",
		fontWeight: "600",
		color: "#333",
		transition: "all 0.3s",
	},

	// Footer styles
	footer: {
		backgroundColor: "#F8F8F8",
		padding: "60px 20px 40px",
		borderTop: "1px solid #E0E0E0",
	},
	footerContainer: {
		maxWidth: "1200px",
		margin: "0 auto",
		display: "flex",
		gap: "60px",
		justifyContent: "space-between",
	},
	footerLeft: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		minWidth: "150px",
	},
	footerLogo: {
		fontSize: "20px",
		fontWeight: "bold",
		color: "#333",
	},
	socialLinks: {
		display: "flex",
		gap: "16px",
	},
	socialIcon: {
		textDecoration: "none",
		color: "#333",
		fontSize: "16px",
		cursor: "pointer",
		transition: "color 0.3s",
	},
	footerColumns: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gap: "40px",
		flex: 1,
	},
	footerColumn: {
		display: "flex",
		flexDirection: "column",
		gap: "12px",
	},
	footerColumnTitle: {
		fontSize: "14px",
		fontWeight: "700",
		margin: "0 0 12px 0",
		color: "#333",
	},
	footerList: {
		listStyle: "none",
		padding: "0",
		margin: "0",
		display: "flex",
		flexDirection: "column",
		gap: "8px",
	},
	footerLink: {
		textDecoration: "none",
		color: "#666",
		fontSize: "13px",
		cursor: "pointer",
		transition: "color 0.3s",
	},
};

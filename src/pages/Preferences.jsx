import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState(["Sports & Fitness"]);

  const preferences = [
    { id: 1, name: "Sports & Fitness", emoji: "🏋️" },
    { id: 2, name: "Arts & Crafts", emoji: "🎨" },
    { id: 3, name: "Reading", emoji: "📚" },
    { id: 4, name: "Traveling", emoji: "✈️" },
    { id: 5, name: "Cooking", emoji: "🍳" },
    { id: 6, name: "Music", emoji: "🎵" },
    { id: 7, name: "Technology", emoji: "💻" },
    { id: 8, name: "Volunteering", emoji: "🤝" },
  ];

  const togglePreference = (name) => {
    setSelectedPreferences(prev =>
      prev.includes(name)
        ? prev.filter(p => p !== name)
        : [...prev, name]
    );
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
        <div style={styles.preferencesContainer}>
          <section style={styles.preferencesHeader}>
            <h1 style={styles.pageTitle}>Choose Your Interests</h1>
          </section>

          <section style={styles.preferencesSection}>
            <h2 style={styles.sectionTitle}>What do you enjoy?</h2>
            
            <div style={styles.cardsContainer}>
              {preferences.map(pref => (
                <div
                  key={pref.id}
                  style={{
                    ...styles.preferenceCard,
                    ...(selectedPreferences.includes(pref.name) ? styles.preferenceCardSelected : {})
                  }}
                  onClick={() => togglePreference(pref.name)}
                >
                  <div style={styles.cardImage}>{pref.emoji}</div>
                  <h3 style={styles.cardTitle}>{pref.name}</h3>
                </div>
              ))}
            </div>

            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={() => navigate('/profile')}>Continue</button>
              <button style={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
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
  preferencesContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  // Preferences Header
  preferencesHeader: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#333",
  },
  pageSubtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
  },

  // Preferences Section
  preferencesSection: {
    marginBottom: "40px",
  },
  preferencesCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#333",
    textAlign: "center",
    marginBottom: "40px",
  },
  sectionDescription: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "32px",
    textAlign: "center",
  },

  // Preference Cards Container
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  preferenceCard: {
    padding: "24px",
    border: "2px solid #E0E0E0",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  preferenceCardSelected: {
    borderColor: "#F4C430",
    backgroundColor: "#FFFAF0",
    boxShadow: "0 4px 12px rgba(244, 196, 48, 0.3)",
  },
  cardImage: {
    fontSize: "48px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0",
    color: "#333",
  },

  // Button Group
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  saveBtn: {
    padding: "12px 32px",
    backgroundColor: "#F4C430",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    transition: "all 0.3s",
  },
  backBtn: {
    padding: "12px 32px",
    backgroundColor: "white",
    border: "2px solid #999",
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

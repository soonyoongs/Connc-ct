import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Profile() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			setLoading(true);
			const { data: { user }, error: userError } = await supabase.auth.getUser();
			
			if (userError) throw userError;
			if (!user) {
				navigate("/login"); // Redirect if not logged in
				return;
			}

			const { data, error: profileError } = await supabase
				.from("profiles")
				.select("user_id, name, email, interests, created_at")
				.eq("user_id", user.id)
				.single();

			if (profileError) {
				if (profileError.code === 'PGRST116') {
					console.log("No profile found for user");
					setProfile(null);
				} else {
					throw profileError;
				}
			} else {
				setProfile(data);
			}
		} catch (err) {
			console.error("Error fetching profile:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

	// Get initials for avatar - uses 'name' field from your table
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading Ring Component
  const LoadingRing = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      width: '100%'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #F4C430',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}></div>
    </div>
  );

	return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      {/* Add CSS animation for the spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
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
        <button onClick={() => navigate("/")} style={{
          padding: '6px 16px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '500',
          color: '#333'
        }}>
          🛖 Home
        </button>
      </nav>

      {/* Show loading state */}
      {loading ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Profile Header Section - Loading */}
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '60px 40px',
            textAlign: 'center',
            borderBottom: '1px solid #ddd'
          }}>
            {/* Loading Avatar */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#ccc',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 0.3; }
                }
              `}</style>
            </div>

            {/* Loading Name and Email */}
            <div style={{
              width: '200px',
              height: '32px',
              backgroundColor: '#e0e0e0',
              margin: '0 auto 8px',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
            <div style={{
              width: '150px',
              height: '14px',
              backgroundColor: '#e0e0e0',
              margin: '0 auto',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
          </div>

          {/* Main Content Loading */}
          <div style={{
            padding: '40px',
            maxWidth: '1000px',
            margin: '0 auto',
            width: '100%'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {/* Loading My Information */}
              <div>
                <div style={{
                  height: '18px',
                  width: '150px',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '24px',
                  borderRadius: '4px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #ddd' }}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '20px', 
                      paddingBottom: '20px', 
                      borderBottom: i < 2 ? '1px solid #ddd' : 'none' 
                    }}>
                      <div style={{
                        width: '60px',
                        height: '12px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                      <div style={{
                        width: '100px',
                        height: '14px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading My Interests */}
              <div>
                <div style={{
                  height: '18px',
                  width: '120px',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '24px',
                  borderRadius: '4px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                
                <div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
                  <div style={{
                    width: '100px',
                    height: '14px',
                    backgroundColor: '#e0e0e0',
                    margin: '0 auto 24px',
                    borderRadius: '4px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                  <div style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                </div>
              </div>
            </div>
            
            {/* Loading Edit Button */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '36px',
                backgroundColor: '#e0e0e0',
                margin: '0 auto',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
            </div>
          </div>
        </div>
      ) : error ? (
        // Error State
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            color: '#ff6b6b'
          }}>⚠️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
            Error Loading Profile
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', maxWidth: '400px' }}>
            {error}
          </p>
          <button
            onClick={fetchProfile}
            style={{
              padding: '10px 24px',
              backgroundColor: '#F4C430',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        // Normal Content (when data is loaded)
        <>
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
              {getInitials(profile?.name)}
            </div>

            {/* Name and Email */}
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>
              {profile?.name || "User"}
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              {profile?.email || "user@example.com"}
            </p>
          </div>

          {/* Main Content Section */}
          <div style={{
            padding: '40px',
            width: '1000px',
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
                    <p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>
                      {profile?.name || "User"}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Email</p>
                    <p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>
                      {profile?.email || "user@example.com"}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Member Since</p>
                    <p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>
                      {profile?.created_at ? formatDate(profile.created_at) : formatDate(new Date().toISOString())}
                    </p>
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

                <div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #ddd' }}>
                  {profile?.interests && profile.interests.length > 0 ? (
                    <>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '24px'
                      }}>
                        {profile.interests.map((interest, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#F4C430',
                              color: '#333',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate('/pref')}
                        style={{
                          width: '100%',
                          padding: '10px 24px',
                          backgroundColor: 'transparent',
                          color: '#F4C430',
                          border: '2px solid #F4C430',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F4C430';
                          e.currentTarget.style.color = '#333';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#F4C430';
                        }}
                      >
                        Edit Interests
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '14px', color: '#666', margin: '0 0 24px 0' }}>No interests set yet</p>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
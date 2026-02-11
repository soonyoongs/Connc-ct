import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/IndicateInterest.css";
import sportsImg from "../assets/images/sports.png";
import musicImg from "../assets/images/music.png";
import readingImg from "../assets/images/reading.png";
import danceImg from "../assets/images/dance.png";
import travelImg from "../assets/images/travel.png";
import artImg from "../assets/images/art.png";
import cookingImg from "../assets/images/cooking.png";
import fitnessImg from "../assets/images/fitness.png";
import mahjongImg from "../assets/images/mahjong.png";
import photographyImg from "../assets/images/photography.png";

export default function IndicateInterest() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const interests = [
    { name: "Sports", image: sportsImg },
    { name: "Music", image: musicImg },
    { name: "Reading", image: readingImg },
    { name: "Dance", image: danceImg },
    { name: "Travel", image: travelImg },
    { name: "Art", image: artImg },
    { name: "Cooking", image: cookingImg },
    { name: "Fitness", image: fitnessImg },
    { name: "Chess/Mahjong", image: mahjongImg },
    { name: "Photography", image: photographyImg },
  ];

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Load existing interests if user has them
  useEffect(() => {
    if (currentUserId) {
      loadExistingInterests();
    }
  }, [currentUserId]);

  const getCurrentUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        navigate("/login");
        return;
      }
      setCurrentUserId(user.id);
    } catch (err) {
      console.error("Error getting user:", err);
      setError("Failed to authenticate user");
    }
  };

  const loadExistingInterests = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("interests")
        .eq("user_id", currentUserId)
        .single();

      if (fetchError) {
        if (fetchError.code !== 'PGRST116') { // Ignore if profile doesn't exist
          console.error("Error loading interests:", fetchError);
        }
        return;
      }

      // If interests exist in the database, set them
      if (data?.interests && Array.isArray(data.interests)) {
        const validInterests = data.interests.filter(interestName => 
          interests.some(i => i.name === interestName)
        );
        setSelectedInterests(validInterests);
      }
    } catch (err) {
      console.error("Error loading interests:", err);
    }
  };

  const toggleInterest = (interestName) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestName)) {
        return prev.filter((name) => name !== interestName);
      } else if (prev.length < 5) {
        return [...prev, interestName];
      }
      return prev;
    });
  };

  const handleSave = async () => {
    if (!currentUserId) {
      setError("User not authenticated");
      return;
    }

    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Check if profile exists for this user
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", currentUserId)
        .single();

      let result;

      if (checkError && checkError.code === 'PGRST116') {
        result = await supabase
          .from("profiles")
          .insert([
            {
              user_id: currentUserId,
              interests: selectedInterests,
              name: user?.user_metadata?.full_name || "User",
              email: user?.email || "",
              created_at: new Date().toISOString(),
            }
          ]);
      } else {
        result = await supabase
          .from("profiles")
          .update({ interests: selectedInterests })
          .eq("user_id", currentUserId);
      }

      const { error: saveError } = result;

      if (saveError) {
        console.error("Error saving interests:", saveError);
        
        // Check for specific database errors
        if (saveError.message.includes("type") || saveError.code === '22P02') {
          setError("Database configuration issue. Please check that 'interests' column accepts arrays.");
        } else if (saveError.code === '23514' || saveError.message.includes("violates check")) {
          setError("Invalid interest selection.");
        } else {
          setError(`Failed to save interests: ${saveError.message}`);
        }
        return;
      }

      console.log("Interests saved successfully:", selectedInterests);
      
      navigate("/profile");
      
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interest-container">
      <h2>Choose Your Interests</h2>
      <p className="interest-subtitle">
        Select up to 5 interests ({selectedInterests.length}/5)
      </p>

      {error && (
        <div className="error-message" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #F4C430',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '10px' }}>Saving interests...</p>
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <div className="interest-grid">
        {interests.map((interest) => (
          <button
            key={interest.name}
            className={`interest-button ${
              selectedInterests.includes(interest.name) ? "selected" : ""
            } ${selectedInterests.length >= 5 && !selectedInterests.includes(interest.name) ? "disabled" : ""}`}
            onClick={() => toggleInterest(interest.name)}
            disabled={selectedInterests.length >= 5 && !selectedInterests.includes(interest.name) || loading}
          >
            <img 
              src={interest.image} 
              alt={interest.name} 
              className="interest-image" 
            />
            <span className="interest-name">{interest.name}</span>
            {selectedInterests.includes(interest.name) && (
              <div className="checkmark">✓</div>
            )}
          </button>
        ))}
      </div>

      {selectedInterests.length > 0 && (
        <div className="selected-summary" style={{
          margin: '20px 0',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <strong>Selected:</strong> {selectedInterests.join(", ")}
        </div>
      )}

      <div className="action-buttons">
        <button 
          onClick={() => navigate(-1)} 
          className="btn-back"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="btn-save"
          disabled={selectedInterests.length === 0 || loading}
        >
          {loading ? "Saving..." : "Save Interests"}
        </button>
      </div>
    </div>
  );
}
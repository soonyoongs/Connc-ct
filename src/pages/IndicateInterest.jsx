import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/IndicateInterest.css";

export default function IndicateInterest() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 1, name: "Sports", image: "/img/sports.jpg" },
    { id: 2, name: "Music", image: "/img/music.jpg" },
    { id: 3, name: "Reading", image: "/img/reading.jpg" },
    { id: 4, name: "Dance", image: "/img/dance.jpg" },
    { id: 5, name: "Travel", image: "/img/travel.jpg" },
    { id: 6, name: "Art", image: "/img/art.jpg" },
    { id: 7, name: "Cooking", image: "/img/cooking.jpg" },
    { id: 8, name: "Fitness", image: "/img/fitness.jpg" },
    { id: 9, name: "Chess/Mahjong", image: "/img/chess-mahjong.jpg" },
    { id: 10, name: "Photography", image: "/img/photography.jpg" },
  ];

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else if (prev.length < 5) {
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const handleSave = () => {
    console.log("Selected interests:", selectedInterests);
    navigate(-1);
  };

  return (
    <div className="interest-container">
      <h2>Choose Your Interests</h2>
      <p className="interest-subtitle">
        Select up to 5 interests ({selectedInterests.length}/5)
      </p>

      <div className="interest-grid">
        {interests.map((interest) => (
          <button
            key={interest.id}
            className={`interest-button ${
              selectedInterests.includes(interest.id) ? "selected" : ""
            } ${selectedInterests.length >= 5 && !selectedInterests.includes(interest.id) ? "disabled" : ""}`}
            onClick={() => toggleInterest(interest.id)}
            disabled={selectedInterests.length >= 5 && !selectedInterests.includes(interest.id)}
          >
            <img src={interest.image} alt={interest.name} className="interest-image" />
            <span className="interest-name">{interest.name}</span>
            {selectedInterests.includes(interest.id) && (
              <div className="checkmark">✓</div>
            )}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(-1)} className="btn-back">
          Back
        </button>
        <button
          onClick={handleSave}
          className="btn-save"
          disabled={selectedInterests.length === 0}
        >
          Save Interests
        </button>
      </div>
    </div>
  );
}

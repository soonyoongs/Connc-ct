import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/Activities.css";

export default function Activities() {
  const navigate = useNavigate();
  const [rsvpedActivities, setRsvpedActivities] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const activities = [
    {
      id: 1,
      title: "Basketball Game",
      type: "Sports",
      date: "2025-02-15",
      time: "19:00",
      location: "Downtown Court",
    },
    {
      id: 2,
      title: "Music Jam Session",
      type: "Music",
      date: "2025-02-16",
      time: "18:30",
      location: "Community Center",
    },
    {
      id: 3,
      title: "Art Workshop",
      type: "Art",
      date: "2025-02-17",
      time: "14:00",
      location: "Creative Studio",
    },
    {
      id: 4,
      title: "Hiking Trip",
      type: "Travel",
      date: "2025-02-18",
      time: "08:00",
      location: "Mountain Trail",
    },
    {
      id: 5,
      title: "Cooking Class",
      type: "Cooking",
      date: "2025-02-19",
      time: "17:00",
      location: "Kitchen Studios",
    },
    {
      id: 6,
      title: "Photography Walk",
      type: "Photography",
      date: "2025-02-20",
      time: "10:00",
      location: "City Downtown",
    },
  ];

  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("interests")
            .eq("user_id", user.id)
            .single();

          if (error) throw error;

          // interests is already an array from the database
          if (data?.interests && Array.isArray(data.interests)) {
            setUserInterests(data.interests);
          }
        }
      } catch (error) {
        console.error("Error fetching user interests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInterests();
  }, []);

  const toggleRsvp = (activityId) => {
    setRsvpedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getRecommendedActivities = () => {
    if (userInterests.length === 0) return [];
    
    return activities.filter((activity) =>
      userInterests.some((interest) => {
        // Handle if interest is an object with name property, or just a string
        const interestStr = typeof interest === 'string' 
          ? interest 
          : interest?.name || interest?.type || String(interest);
        
        return interestStr.toLowerCase().trim() === activity.type.toLowerCase().trim();
      })
    );
  };

  const recommendedActivities = getRecommendedActivities();

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      <p className="activities-subtitle">Discover and RSVP to events</p>

      {!loading && recommendedActivities.length > 0 && (
        <div className="recommendations-section">
          <h3>Recommended for You</h3>
          <p className="recommendations-subtitle">
            Based on your interests: {userInterests.join(", ")}
          </p>
          <div className="activities-list">
            {recommendedActivities.map((activity) => (
              <div key={activity.id} className="activity-card recommended">
                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <div className="activity-details">
                    <span className="activity-type">{activity.type}</span>
                    <span className="recommended-badge">⭐ Recommended</span>
                  </div>
                  <div className="activity-meta">
                    <div className="meta-item">
                      <span className="meta-label">📅</span>
                      <span>{formatDate(activity.date)}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">🕐</span>
                      <span>{formatTime(activity.time)}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">📍</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`rsvp-button ${
                    rsvpedActivities.includes(activity.id) ? "rsvped" : ""
                  }`}
                  onClick={() => toggleRsvp(activity.id)}
                >
                  {rsvpedActivities.includes(activity.id) ? "✓ RSVP'd" : "RSVP"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>Other Activities</h3>
      <div className="activities-list">
        {activities
          .filter((activity) => !recommendedActivities.some((rec) => rec.id === activity.id))
          .map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-content">
              <h3 className="activity-title">{activity.title}</h3>
              <div className="activity-details">
                <span className="activity-type">{activity.type}</span>
              </div>
              <div className="activity-meta">
                <div className="meta-item">
                  <span className="meta-label">📅</span>
                  <span>{formatDate(activity.date)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">🕐</span>
                  <span>{formatTime(activity.time)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">📍</span>
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
            <button
              className={`rsvp-button ${
                rsvpedActivities.includes(activity.id) ? "rsvped" : ""
              }`}
              onClick={() => toggleRsvp(activity.id)}
            >
              {rsvpedActivities.includes(activity.id) ? "✓ RSVP'd" : "RSVP"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)} className="btn-back-activities">
        Back
      </button>
    </div>
  );
}

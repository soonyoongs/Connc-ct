import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Activities.css";

export default function Activities() {
  const navigate = useNavigate();
  const [rsvpedActivities, setRsvpedActivities] = useState([]);

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

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      <p className="activities-subtitle">Discover and RSVP to events</p>

      <div className="activities-list">
        {activities.map((activity) => (
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

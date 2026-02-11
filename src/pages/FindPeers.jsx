import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FindPeers.css";

export default function FindPeers() {
  const navigate = useNavigate();
  const [connectedPeers, setConnectedPeers] = useState([]);
  const [outgoingInvitations, setOutgoingInvitations] = useState([]);
  const [incomingInvitations, setIncomingInvitations] = useState([]);

  const peers = [
    {
      id: 1,
      name: "Alex Chen",
      age: 25,
      interests: ["Sports", "Gaming", "Photography"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 23,
      interests: ["Music", "Art", "Travel"],
    },
    {
      id: 3,
      name: "Michael Park",
      age: 26,
      interests: ["Fitness", "Cooking", "Technology"],
    },
    {
      id: 4,
      name: "Emma Wilson",
      age: 24,
      interests: ["Reading", "Travel", "Gaming"],
    },
    {
      id: 5,
      name: "James Lee",
      age: 27,
      interests: ["Sports", "Photography", "Music"],
    },
    {
      id: 6,
      name: "Lisa Chen",
      age: 22,
      interests: ["Art", "Cooking", "Reading"],
    },
  ];

  const toggleConnect = (peerId) => {
    setConnectedPeers((prev) =>
      prev.includes(peerId)
        ? prev.filter((id) => id !== peerId)
        : [...prev, peerId]
    );
  };

  const sendInvitation = (peerId) => {
    setOutgoingInvitations((prev) => [...prev, peerId]);
  };

  const cancelInvitation = (peerId) => {
    setOutgoingInvitations((prev) => prev.filter((id) => id !== peerId));
  };

  const acceptInvitation = (peerId) => {
    setIncomingInvitations((prev) => prev.filter((id) => id !== peerId));
    setConnectedPeers((prev) => [...prev, peerId]);
  };

  const declineInvitation = (peerId) => {
    setIncomingInvitations((prev) => prev.filter((id) => id !== peerId));
  };

  const getButtonState = (peerId) => {
    if (connectedPeers.includes(peerId)) {
      return "connected";
    }
    if (outgoingInvitations.includes(peerId)) {
      return "invitation_sent";
    }
    if (incomingInvitations.includes(peerId)) {
      return "invitation_received";
    }
    return "default";
  };

  return (
    <div className="find-peers-container">
      <h2>Find Peers</h2>
      <p className="find-peers-subtitle">Search and connect with peers</p>

      <div className="peers-grid">
        {peers.map((peer) => (
          <div key={peer.id} className="peer-card">
            <div className="peer-header">
              <div className="peer-avatar">{peer.name.charAt(0)}</div>
              <div className="peer-basic-info">
                <h3 className="peer-name">{peer.name}</h3>
                <p className="peer-age">{peer.age} years old</p>
              </div>
            </div>

            <div className="peer-interests">
              <p className="interests-label">Interests:</p>
              <div className="interests-tags">
                {peer.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {getButtonState(peer.id) === "connected" && (
              <button className="connect-button connected" disabled>
                ✓ Connected
              </button>
            )}

            {getButtonState(peer.id) === "default" && (
              <button
                className="connect-button"
                onClick={() => sendInvitation(peer.id)}
              >
                Connect
              </button>
            )}

            {getButtonState(peer.id) === "invitation_sent" && (
              <button
                className="connect-button pending"
                onClick={() => cancelInvitation(peer.id)}
              >
                ⏳ Invitation Sent (Click to Cancel)
              </button>
            )}

            {getButtonState(peer.id) === "invitation_received" && (
              <div className="invitation-actions">
                <button
                  className="connect-button accept"
                  onClick={() => acceptInvitation(peer.id)}
                >
                  ✓ Accept
                </button>
                <button
                  className="connect-button decline"
                  onClick={() => declineInvitation(peer.id)}
                >
                  ✗ Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)} className="btn-back-findpeers">
        Back
      </button>
    </div>
  );
}

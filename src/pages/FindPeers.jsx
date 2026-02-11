import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/FindPeers.css";

export default function FindPeers() {
  const navigate = useNavigate();
  const [connectedPeers, setConnectedPeers] = useState([]);
  const [outgoingInvitations, setOutgoingInvitations] = useState([]);
  const [incomingInvitations, setIncomingInvitations] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const peers = [
    {
      id: 1,
      name: "Alex Chen",
      age: 25,
      gender: "Male",
      interests: ["Sports", "Gaming", "Photography"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 23,
      gender: "Female",
      interests: ["Music", "Art", "Travel"],
    },
    {
      id: 3,
      name: "Michael Park",
      age: 26,
      gender: "Male",
      interests: ["Fitness", "Cooking", "Technology"],
    },
    {
      id: 4,
      name: "Emma Wilson",
      age: 24,
      gender: "Female",
      interests: ["Reading", "Travel", "Gaming"],
    },
    {
      id: 5,
      name: "James Lee",
      age: 27,
      gender: "Male",
      interests: ["Sports", "Photography", "Music"],
    },
    {
      id: 6,
      name: "Lisa Chen",
      age: 22,
      gender: "Female",
      interests: ["Art", "Cooking", "Reading"],
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

  const toggleConnect = (peerId) => {
    setConnectedPeers((prev) =>
      prev.includes(peerId)
        ? prev.filter((id) => id !== peerId)
        : [...prev, peerId]
    );
  };

  const getRecommendedPeers = () => {
    if (userInterests.length === 0) return [];

    return peers.filter((peer) =>
      peer.interests.some((peerInterest) =>
        userInterests.some((interest) => {
          const interestStr = typeof interest === "string"
            ? interest
            : interest?.name || interest?.type || String(interest);

          return (
            interestStr.toLowerCase().trim() ===
            peerInterest.toLowerCase().trim()
          );
        })
      )
    );
  };

  const recommendedPeers = getRecommendedPeers();

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

  const isInterestMatching = (peerInterest) => {
    return userInterests.some((interest) => {
      const interestStr = typeof interest === "string"
        ? interest
        : interest?.name || interest?.type || String(interest);
      return (
        interestStr.toLowerCase().trim() ===
        peerInterest.toLowerCase().trim()
      );
    });
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
      <h2>Community</h2>
      <p className="find-peers-subtitle">Search and connect with younger peers!</p>

      {!loading && recommendedPeers.length > 0 && (
        <div className="recommendations-section">
          <h3 className="recommended-header">👇Recommended for You👇</h3>
          <p className="recommendations-subtitle">
            Based on your interests:
          </p>
          <div className="peers-grid">
            {recommendedPeers.map((peer) => (
              <div key={peer.id} className="peer-card recommended">
                <div className="peer-header">
                  <div className="peer-avatar">{peer.name.charAt(0)}</div>
                  <div className="peer-basic-info">
                    <h3 className="peer-name">{peer.name}</h3>
                    <p className="peer-gender">{peer.gender}</p>
                  </div>
                </div>

                <div className="peer-interests">
                  <p className="interests-label">Interests:</p>
                  <div className="interests-tags">
                    {peer.interests.map((interest, index) => (
                      <span
                        key={index}
                        className={`interest-tag ${
                          isInterestMatching(interest) ? "matching-interest" : ""
                        }`}
                      >
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
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>Other Peers</h3>
      <div className="peers-grid">
        {peers
          .filter(
            (peer) =>
              !recommendedPeers.some((rec) => rec.id === peer.id)
          )
          .map((peer) => (
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
                  <span
                    key={index}
                    className={`interest-tag ${
                      isInterestMatching(interest) ? "matching-interest" : ""
                    }`}
                  >
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

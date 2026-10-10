import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const BACKEND_URL = "/api/reviews";


export default function ClientSatisfaction() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rating: "5",
    comment: "",
  });

  // Fetch all feedbacks on load
  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Submit new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.comment) {
      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newReview = await response.json();
          setFeedbacks((prev) => [newReview, ...prev]); // show immediately
          setFormData({
            name: "",
            company: "",
            rating: "5",
            comment: "",
          });

          const successMsg = document.getElementById("successMessage");
          successMsg.style.display = "block";
          setTimeout(() => {
            successMsg.style.display = "none";
          }, 3000);
        } else {
          alert("Error submitting feedback");
        }
      } catch (err) {
        console.error("Error submitting review:", err);
      }
    }
  };

  return (
    <>
      <Nav />

      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="container" style={{ paddingTop: 'clamp(1.5rem, 4vw, 3rem)', paddingBottom: '4rem', maxWidth: '900px', paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
          <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--primary)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
            Client Satisfaction &amp; Testimonials
          </h2>

          {/* Submit Form */}
          <div className="card shadow-sm mb-5" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', padding: 'clamp(1rem, 3.5vw, 1.5rem)' }}>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>Submit Your Feedback</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: 'var(--text)' }}>Name</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text)', fontSize: '1rem' }}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: 'var(--text)' }}>Company (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text)', fontSize: '1rem' }}
                  placeholder="Enter your company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: 'var(--text)' }}>Rating</label>
                <select
                  className="form-select"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text)', fontSize: '1rem', minHeight: '44px' }}
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                >
                  <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
                  <option value="4">⭐️⭐️⭐️⭐️ Good</option>
                  <option value="3">⭐️⭐️⭐️ Average</option>
                  <option value="2">⭐️⭐️ Poor</option>
                  <option value="1">⭐️ Very Poor</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: 'var(--text)' }}>Comment</label>
                <textarea
                  className="form-control"
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text)', fontSize: '1rem' }}
                  rows="3"
                  placeholder="Write your feedback..."
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn fw-bold w-100" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)', color: 'var(--primary-contrast)', minHeight: '48px', touchAction: 'manipulation' }}>
                Submit Feedback
              </button>
            </form>

            <div
              id="successMessage"
              className="alert alert-success text-center fw-bold mt-3"
              style={{ display: "none" }}
            >
              ✅ Feedback submitted successfully!
            </div>
          </div>

          {/* Feedback Display */}
          <div className="card shadow-lg" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', padding: 'clamp(1rem, 3.5vw, 1.5rem)' }}>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>What People Say</h4>
            {feedbacks.length === 0 ? (
              <p className="text-center" style={{ color: 'var(--text-muted)' }}>No feedback yet.</p>
            ) : (
              feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="mb-3 pb-3"
                  style={{ wordBreak: "break-word", borderBottom: '1px solid var(--border)' }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h5 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{fb.name}</h5>
                    <span style={{ color: 'var(--warning)' }}>
                      {"⭐".repeat(fb.rating)}
                    </span>
                  </div>
                  {fb.company && (
                    <p className="mb-1" style={{ color: 'var(--text-muted)' }}>{fb.company}</p>
                  )}
                  <p className="mb-1" style={{ color: 'var(--text)' }}>{fb.comment}</p>
                  <small style={{ color: 'var(--text-muted)' }}>
                    {new Date(fb.date).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

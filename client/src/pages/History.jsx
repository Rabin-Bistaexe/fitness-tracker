import { useState } from "react";

export default function History({ workouts = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Workout History</h1>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Search through all your logged training sessions.
      </p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search workouts (e.g. Chest)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #475569",
          marginBottom: "25px",
          boxSizing: "border-box"
        }}
      />

      {/* Workout List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredWorkouts.length === 0 ? (
          <p style={{ color: "#aaa" }}>No workouts found.</p>
        ) : (
          filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              style={{
                backgroundColor: "#ffffff",
                color: "#1a1a1a",
                borderRadius: "8px",
                padding: "16px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "20px", color: "#111827" }}>{workout.name}</h3>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{workout.date}</span>
              </div>

              <p style={{ margin: "6px 0", fontSize: "14px", color: "#4b5563" }}>
                Rating: ⭐ {workout.rating}/5
              </p>

              {workout.notes && (
                <p style={{ margin: "8px 0", fontSize: "13px", fontStyle: "italic", color: "#374151" }}>
                  "{workout.notes}"
                </p>
              )}

              {workout.exercises && workout.exercises.length > 0 && (
                <ul style={{ margin: "10px 0 0 0", paddingLeft: "20px", fontSize: "14px" }}>
                  {workout.exercises.map((ex, i) => (
                    <li key={i}>
                      <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
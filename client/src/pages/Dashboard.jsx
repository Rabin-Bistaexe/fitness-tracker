import React from "react";
import {fakeWorkouts} from "../fakeData";


export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
      <h2>Recent Workouts</h2>

      {/* Grid container to display cards side-by-side */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "15px" }}>
        {fakeWorkouts.map((workout) => (
          <div
            key={workout.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "280px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
            }}
          >
            <h3 style={{ marginTop: 0 }}>{workout.name}</h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
              <strong>Date:</strong> {workout.date}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Rating:</strong> ⭐ {workout.rating}/5
            </p>
            <p style={{ margin: "10px 0", fontStyle: "italic" }}>
              "{workout.notes}"
            </p>

            {/* Inner .map() to display individual exercises */}
            <h4 style={{ marginBottom: "8px", marginTop: "15px" }}>Exercises:</h4>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px" }}>
              {workout.exercises.map((exercise, index) => (
                <li key={index}>
                  {exercise.name} ({exercise.sets} sets × {exercise.reps} reps)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
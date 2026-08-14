import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Imports redirect tool

export default function LogWorkout({ onAddWorkout }) { // Destructure prop
  const navigate = useNavigate();

  // Form State
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("5");
  const [notes, setNotes] = useState("");

  // Exercises State
  const [exercises, setExercises] = useState([]);
  const [exName, setExName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!exName.trim()) return;

    setExercises([
      ...exercises,
      { name: exName, sets: Number(sets) || 1, reps: Number(reps) || 1 }
    ]);

    setExName("");
    setSets("");
    setReps("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWorkout = {
      id: Date.now(),
      name: workoutName,
      date: date,
      rating: Number(rating),
      notes: notes,
      exercises: exercises
    };

    // 1. Send new workout up to App.jsx state
    if (onAddWorkout) {
      onAddWorkout(newWorkout);
    }

    // 2. Automatically redirect to Dashboard!
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "550px", margin: "0 auto", textAlign: "left", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "20px" }}>Log a New Workout</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Workout Title:</label>
          <input
            type="text"
            required
            placeholder="e.g. Chest & Triceps"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Date:</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", boxSizing: "border-box" }}
            >
              <option value="5">⭐ 5 - Excellent</option>
              <option value="4">⭐ 4 - Good</option>
              <option value="3">⭐ 3 - Average</option>
              <option value="2">⭐ 2 - Bad</option>
              <option value="1">⭐ 1 - Terrible</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Notes:</label>
          <textarea
            rows="3"
            placeholder="How did it feel?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ padding: "16px", backgroundColor: "#1e293b", borderRadius: "8px", boxSizing: "border-box" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#fff" }}>
            Add Exercises:
          </label>
          
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px", width: "100%" }}>
            <input
              type="text"
              placeholder="Exercise (e.g. Bench Press)"
              value={exName}
              onChange={(e) => setExName(e.target.value)}
              style={{ flex: "2 1 0%", minWidth: 0, padding: "8px", borderRadius: "6px", border: "1px solid #334155", boxSizing: "border-box" }}
            />
            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              style={{ flex: "1 1 0%", minWidth: 0, padding: "8px", borderRadius: "6px", border: "1px solid #334155", boxSizing: "border-box" }}
            />
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              style={{ flex: "1 1 0%", minWidth: 0, padding: "8px", borderRadius: "6px", border: "1px solid #334155", boxSizing: "border-box" }}
            />
            <button
              type="button"
              onClick={handleAddExercise}
              style={{
                padding: "8px 12px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              + Add
            </button>
          </div>

          {exercises.length > 0 && (
            <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#cbd5e1", margin: "10px 0 0 0" }}>
              {exercises.map((ex, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>
                  <strong>{ex.name}</strong> ({ex.sets} sets × {ex.reps} reps)
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Save Workout
        </button>

      </form>
    </div>
  );
}
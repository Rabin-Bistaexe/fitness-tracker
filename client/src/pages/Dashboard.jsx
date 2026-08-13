import { fakeWorkouts } from "../fakeData";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 5px 0" }}>Dashboard</h1>
        <p style={{ color: "#aaa", margin: 0, fontSize: "15px" }}>
          Overview of your recent workout activity
        </p>
      </div>

      <h2 style={{ fontSize: "20px", textAlign: "left", marginBottom: "15px" }}>
        Recent Workouts
      </h2>

      {/* Cards Grid */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {fakeWorkouts.map((workout) => (
          <div
            key={workout.id}
            style={{
              borderRadius: "12px",
              padding: "20px",
              width: "280px",
              backgroundColor: "#ffffff",
              color: "#1a1a1a",
              textAlign: "left",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "10px",
                color: "#111827",
                fontSize: "20px",
              }}
            >
              {workout.name}
            </h3>

            <p style={{ margin: "4px 0", fontSize: "14px", color: "#4b5563" }}>
              <strong>Date:</strong> {workout.date}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#4b5563" }}>
              <strong>Rating:</strong> ⭐ {workout.rating}/5
            </p>

            <p
              style={{
                margin: "12px 0",
                fontSize: "13px",
                fontStyle: "italic",
                color: "#374151",
                backgroundColor: "#f3f4f6",
                padding: "8px 10px",
                borderRadius: "6px",
              }}
            >
              "{workout.notes}"
            </p>

            <h4
              style={{
                marginBottom: "8px",
                marginTop: "16px",
                color: "#1f2937",
                fontSize: "15px",
              }}
            >
              Exercises
            </h4>

            <ul
              style={{
                paddingLeft: "20px",
                margin: 0,
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {workout.exercises?.map((exercise, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  <strong>{exercise.name}</strong> ({exercise.sets} sets ×{" "}
                  {exercise.reps} reps)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

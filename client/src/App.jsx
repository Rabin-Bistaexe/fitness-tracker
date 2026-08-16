import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import History from "./pages/History";
import { fakeWorkouts } from "./fakeData";

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("my_workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : fakeWorkouts;
  });

  useEffect(() => {
    localStorage.setItem("my_workouts", JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  // Delete workout from state (and localStorage via useEffect)
  const handleDeleteWorkout = (idToDelete) => {
    setWorkouts(workouts.filter((workout) => workout.id !== idToDelete));
  };

  return (
    <BrowserRouter>
      {/* Polished Navbar Header */}
      <nav style={{
        display: "flex",
        gap: "20px",
        padding: "14px 24px",
        backgroundColor: "#0f172a",
        alignItems: "center",
        borderBottom: "1px solid #1e293b",
        marginBottom: "20px"
      }}>
        <span style={{ fontWeight: "bold", color: "#38bdf8", fontSize: "18px", marginRight: "auto" }}>
          FitTracker
        </span>
        <Link to="/dashboard" style={{ color: "#f8fafc", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/log-workout" style={{ color: "#f8fafc", textDecoration: "none" }}>Log Workout</Link>
        <Link to="/history" style={{ color: "#f8fafc", textDecoration: "none" }}>History</Link>
        <Link to="/login" style={{ color: "#94a3b8", textDecoration: "none" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />} />
        <Route path="/" element={<Dashboard workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />} />
        <Route path="/log-workout" element={<LogWorkout onAddWorkout={handleAddWorkout} />} />
        <Route path="/history" element={<History workouts={workouts} onDeleteWorkout={handleDeleteWorkout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
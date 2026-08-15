import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import History from "./pages/History";
import { fakeWorkouts } from "./fakeData";

function App() {
  // 1. Load workouts from localStorage on first render (fallback to fakeWorkouts)
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("my_workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : fakeWorkouts;
  });

  // 2. Save workouts to localStorage whenever the `workouts` state changes
  useEffect(() => {
    localStorage.setItem("my_workouts", JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/log-workout">Log Workout</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard workouts={workouts} />} />
        <Route path="/" element={<Dashboard workouts={workouts} />} />
        <Route path="/log-workout" element={<LogWorkout onAddWorkout={handleAddWorkout} />} />
        <Route path="/history" element={<History workouts={workouts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import History from "./pages/History";
import { fakeWorkouts } from "./fakeData"; // Make sure path matches your setup

function App() {
  // 1. Master workouts state lives here now!
  const [workouts, setWorkouts] = useState(fakeWorkouts);

  // 2. Function to add new workout to top of list
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
        
        {/* 3. Pass workouts state to Dashboard */}
        <Route path="/dashboard" element={<Dashboard workouts={workouts} />} />
        <Route path="/" element={<Dashboard workouts={workouts} />} />
        
        {/* 4. Pass handleAddWorkout function to LogWorkout */}
        <Route path="/log-workout" element={<LogWorkout onAddWorkout={handleAddWorkout} />} />
        <Route path="/history" element={<History workouts={workouts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
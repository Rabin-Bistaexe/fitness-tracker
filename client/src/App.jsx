import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LogWorkout from "./pages/LogWorkout";
import History from "./pages/History";
import { fakeWorkouts } from "./fakeData";

// Helper component to redirect unauthenticated users
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // 1. User state backed by localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fittracker_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Workouts state
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("my_workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : fakeWorkouts;
  });

  useEffect(() => {
    localStorage.setItem("my_workouts", JSON.stringify(workouts));
  }, [workouts]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("fittracker_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("fittracker_user");
  };

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleDeleteWorkout = (idToDelete) => {
    setWorkouts(workouts.filter((workout) => workout.id !== idToDelete));
  };

  return (
    <BrowserRouter>
      {/* Dynamic Navbar */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "14px 24px",
          backgroundColor: "#0f172a",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            color: "#38bdf8",
            fontSize: "18px",
            marginRight: "auto",
          }}
        >
          FitTracker
        </span>

        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{ color: "#f8fafc", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <Link
              to="/log-workout"
              style={{ color: "#f8fafc", textDecoration: "none" }}
            >
              Log Workout
            </Link>
            <Link
              to="/history"
              style={{ color: "#f8fafc", textDecoration: "none" }}
            >
              History
            </Link>
            <span
              style={{ color: "#94a3b8", fontSize: "14px", marginLeft: "10px" }}
            >
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#334155",
                color: "#f8fafc",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "#f8fafc", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "#94a3b8", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard
                workouts={workouts}
                onDeleteWorkout={handleDeleteWorkout}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard
                workouts={workouts}
                onDeleteWorkout={handleDeleteWorkout}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/log-workout"
          element={
            <ProtectedRoute user={user}>
              <LogWorkout onAddWorkout={handleAddWorkout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute user={user}>
              <History
                workouts={workouts}
                onDeleteWorkout={handleDeleteWorkout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

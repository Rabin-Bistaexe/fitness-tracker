import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    // Simulate account creation & immediately log in
    onLogin({ email, name });
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "40px auto",
        textAlign: "left",
      }}
    >
      <h1 style={{ marginBottom: "10px", lineHeight: "1.2", fontSize: "28px" }}>
        Create an Account
      </h1>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Start tracking your workouts today.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Full Name:
          </label>
          <input
            type="text"
            required
            placeholder="Alex Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #475569",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            required
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #475569",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #475569",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "15px", color: "#aaa", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#38bdf8" }}>
          Log in here
        </Link>
      </p>
    </div>
  );
}

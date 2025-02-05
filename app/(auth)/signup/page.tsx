"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/user";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await createUser({ name, email, password })



    const data = await res.data;

    if (data) {
     
      router.push("/login");
    } else {
      setError(res.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>

      {/* Styling */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
        }
        .form-container {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #000;
        }
        .signup-form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #000;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #000;
          border-radius: 4px;
          font-size: 1rem;
          background-color: #fff;
          color: #000;
        }
        .signup-button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #000;
          border-radius: 4px;
          cursor: pointer;
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

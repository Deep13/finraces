import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check on load if user is stored and not expired
  useEffect(() => {
    const stored = localStorage.getItem("demoUser");

    if (stored) {
      try {
        const parsed = JSON.parse(atob(stored)); // decode then parse
        const now = Date.now();

        if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
          navigate("/");
        } else {
          localStorage.removeItem("demoUser");
        }
      } catch (e) {
        console.error("Invalid stored data", e);
        localStorage.removeItem("demoUser");
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = import.meta.env.VITE_EMAIL_ID;
    const storedPassword = import.meta.env.VITE_PASSWORD;

    if (email === storedEmail && password === storedPassword) {
      const encoded = btoa(
        JSON.stringify({ email, password, timestamp: Date.now() })
      );
      localStorage.setItem("demoUser", encoded);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#000924] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#000A2D] p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          FinRacers
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Sign In
        </h2>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-2xl font-medium transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Auth2;

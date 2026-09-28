import { useState } from "react";

function App() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function callBackend() {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/hello");

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }

      const data = await response.json();

      setMessage(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="badge">Docker ECS Test</div>

        <h1>React + Node + Docker</h1>

        <p>
          This React application is running inside a Docker container.
        </p>

        <p>
          Click the button to test communication with the Node.js backend.
        </p>

        <button onClick={callBackend} disabled={loading}>
          {loading ? "Calling backend..." : "Call Node Backend"}
        </button>

        {message && (
          <div className="success">
            <h2>Backend Response</h2>

            <p>{message.message}</p>

            <small>
              Server time: {message.timestamp}
            </small>
          </div>
        )}

        {error && (
          <div className="error">
            <h2>Backend Error</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

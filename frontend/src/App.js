import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/shorten", { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h1>🔗 Link Shortener</h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a long URL"
        style={{ padding: "10px", width: "300px" }}
      />

      <button
        onClick={shortenUrl}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;

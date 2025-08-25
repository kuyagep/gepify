import React, { useState } from "react";
import axios from "axios";
import { Copy, ExternalLink, Link2 } from "lucide-react";

export default function App() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const handleShorten = async () => {
    setError("");
    setShortUrl("");
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/shorten`, {
        url,
        alias: alias || undefined,
      });

      const apiShort =
        res?.data?.shortUrl ||
        (res?.data?.shortId ? `${API_BASE}/${res.data.shortId}` : "");

      if (!apiShort) throw new Error("Unexpected response from server.");
      setShortUrl(apiShort);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Link2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Shorten. Share. Grow.
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Gepify helps social media users create clean, memorable links that
            stand out.
          </p>
          <a
            href="#shortener"
            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Get Started Free
          </a>
        </div>
      </header>

      {/* Shortener Section */}
      <main
        id="shortener"
        className="flex-1 flex items-center justify-center py-16 bg-gray-50 px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Paste your link below
          </h2>

          <input
            type="text"
            placeholder="Paste your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            {loading ? "Shortening..." : "Shorten Link"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {shortUrl && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">Your shortened link:</p>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-medium truncate"
                >
                  {shortUrl}
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>
          🔗 Gepify &copy; {new Date().getFullYear()} — Clean links for social media
        </p>
      </footer>
    </div>
  );
}

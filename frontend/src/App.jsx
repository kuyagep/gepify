import React, { useState } from "react";
import axios from "axios";
import { Copy, ExternalLink, Link2 } from "lucide-react";
// import QRCode from "qrcode.react";

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

      // Accepts {shortUrl} or {shortId}
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <Link2 className="text-indigo-600 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gepify</h1>
        <p className="text-gray-500 mb-6">Shorten your long links for social media.</p>

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
            <div className="flex justify-center mt-4">
              {/* <QRCode value={shortUrl} size={128} /> */}
            </div>
          </div>
        )}
      </div>
      <p className="text-white mt-6 text-sm opacity-70">
        🔗 Gepify — clean links for social media
      </p>
    </div>
  );
}

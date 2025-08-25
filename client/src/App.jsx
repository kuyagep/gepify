import React, { useState } from "react";
import axios from "axios";
import { Copy, ExternalLink } from "lucide-react";

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
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
                className="h-8 w-auto"
              />
              <span className="text-white font-bold text-lg">Gepify</span>
            </a>
          </div>

        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-32 lg:px-8 flex-1">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>


        {/* Shortener Form */}
        <div
          id="shortener"
          className="mx-auto max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center"
        >
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

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-6 text-center text-sm">
        <p>
          🔗 Gepify &copy; {new Date().getFullYear()} — Clean links for social media
        </p>
      </footer>
    </div>
  );
}

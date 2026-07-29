"use client";

import { useEffect, useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await fetch(
        "https://shona-translation-ai-4p67.onrender.com/history",
      );
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      console.log("History error:", e);
    }
  }

  async function translate() {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        "https://shona-translation-ai-4p67.onrender.com/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        },
      );

      const data = await res.json();
      setResult(data.translation);

      loadHistory();
    } catch (e) {
      setResult("Error translating text");
    }

    setLoading(false);
  }

  async function copyText() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function loadFromHistory(item) {
    setText(item.original);
    setResult(item.translation);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b font-bold text-lg">
          Translation History
        </div>

        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => loadFromHistory(item)}
            className="p-3 border-b hover:bg-gray-50 cursor-pointer transition"
          >
            <p className="text-sm text-gray-600 truncate">{item.original}</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.translation}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="bg-white border-b p-4 font-semibold">
          Shona AI Translator
        </div>

        {/* CHAT OUTPUT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {text && (
            <div className="flex justify-end">
              <div className="bg-black text-white px-4 py-2 rounded-2xl max-w-xl">
                {text}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" />
              Translating...
            </div>
          )}

          {result && (
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-3 rounded-2xl max-w-xl shadow-sm">
                <p className="text-lg">{result}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={copyText}
                    className="text-gray-500 hover:text-black"
                  >
                    <Copy size={16} />
                  </button>

                  <span className="text-xs text-green-600">
                    {copied ? "Copied!" : ""}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="bg-white border-t p-4 flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type English text..."
            className="flex-1 border rounded-full px-4 py-2"
          />

          <button
            onClick={translate}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function translate() {
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    setResult(data.translation);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Shona AI Translator</h1>

      <textarea
        style={{ width: 400, height: 100 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter English text"
      />

      <br />
      <br />

      <button onClick={translate}>
        {loading ? "Translating..." : "Translate"}
      </button>

      <h2>Result:</h2>
      <p>{result}</p>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("https://shona-translation-ai.onrender.com/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          Total Translations: {stats.total_translations}
        </div>

        <div className="p-4 bg-green-100 rounded">
          Good Feedback: {stats.good_feedback}
        </div>

        <div className="p-4 bg-red-100 rounded">
          Bad Feedback: {stats.bad_feedback}
        </div>
      </div>
    </div>
  );
}

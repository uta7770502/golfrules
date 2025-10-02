import { useState } from "react";

const rules = [
  "バンカーでクラブを砂につけていい？",
  "旗を抜いていい？",
  "OBのルール",
  "グリーン上でマークの仕方",
  "空振りの扱い",
  "プレー順のルール",
];

export default function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = rules.filter((rule) =>
        rule.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* ヘッダー */}
      <header style={{ background: "#16a34a", color: "white", padding: "1rem", textAlign: "center", fontWeight: "bold" }}>
        ゴルフルール
      </header>

      <main style={{ padding: "1rem" }}>
        {/* ルール一覧ボタン */}
        <button style={{ width: "100%", background: "#fef9c3", borderRadius: "0.5rem", padding: "1rem", fontWeight: "bold", marginBottom: "1rem" }}>
          📑 ルール一覧（2025 最新ver.）
        </button>

        {/* 検索ボックス */}
        <div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="ルールを検索..."
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: "0.5rem", padding: "0.75rem" }}
          />
          {suggestions.length > 0 && (
            <ul style={{ marginTop: "0.5rem", border: "1px solid #ccc", borderRadius: "0.5rem", background: "#fff" }}>
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={() => setQuery(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* よく見るルール */}
        <section style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>⭐ よく見るルール</h2>
          <div style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem", cursor: "pointer" }}>
            バンカーでクラブを砂につけていい？旗を抜いていい？
          </div>
        </section>

        {/* 場所で探す */}
        <section style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>🌱 場所で探す</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <button style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem" }}>OB</button>
            <button style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem" }}>フェアウェイ</button>
            <button style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem" }}>ラフ</button>
            <button style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem" }}>グリーン</button>
            <button style={{ background: "#ecfdf5", padding: "1rem", borderRadius: "0.5rem", gridColumn: "span 2" }}>ウォーターハザード</button>
          </div>
        </section>

        {/* 種類から探す */}
        <section style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>📂 種類から探す</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <button style={{ background: "#fef9c3", padding: "1rem", borderRadius: "0.5rem" }}>OB</button>
            <button style={{ background: "#fef9c3", padding: "1rem", borderRadius: "0.5rem" }}>ペナルティ</button>
            <button style={{ background: "#fef9c3", padding: "1rem", borderRadius: "0.5rem" }}>プレー順</button>
            <button style={{ background: "#fef9c3", padding: "1rem", borderRadius: "0.5rem" }}>道具の扱い</button>
          </div>
        </section>
      </main>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


function renderPopularKeywords() {
  const popularList = ["OB", "バンカー", "暫定球", "ロストボール", "旗", "グリーン"];
  const container = document.getElementById("popularKeywords");
  container.innerHTML = "";
  popularList.slice(0, 6).forEach(keyword => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = keyword;
    btn.addEventListener("click", () => {
      const filtered = rules.filter(r => r.name.includes(keyword) || r.detail.includes(keyword));
      showResults(filtered);
      window.scrollTo({ top: document.getElementById("results").offsetTop, behavior: "smooth" });
    });
    container.appendChild(btn);
  });
}

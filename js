let rules = [];

// 初期化
document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  if (path.endsWith("rules.html")) renderRulesList();
  else if (path.endsWith("rule.html")) renderRuleDetail();
  else if (path.endsWith("favorites.html")) renderFavorites();
  else if (path.endsWith("index.html") || path.endsWith("/")) renderPopularKeywords();
});

// ✅ 人気キーワード表示
function renderPopularKeywords() {
  const container = document.getElementById("keyword-container");
  if (!container) return;
  const keywords = ["OB", "ペナルティ", "救済", "バンカー", "ラフ", "グリーン"];
  keywords.forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = k;
    btn.onclick = () => filterRules(k);
    container.appendChild(btn);
  });
}

// ✅ 一覧ページ
async function renderRulesList() {
  const res = await fetch("rules.json");
  rules = await res.json();
  const container = document.getElementById("rules-container");

  const input = document.getElementById("searchRulesInput");
  input.addEventListener("input", e => {
    const keyword = e.target.value;
    displayFilteredRules(keyword);
  });

  displayFilteredRules("");
}

function displayFilteredRules(keyword) {
  const container = document.getElementById("rule-list");
  container.innerHTML = "";

  const filtered = rules.filter(
    (r) =>
      r.title.includes(keyword) ||
      (r.description && r.description.includes(keyword))
  );

  filtered.forEach((rule) => {
    const card = document.createElement("div");
    card.className = `rule-card ${rule.isLocal ? "local-rule" : ""}`;
    card.innerHTML = `
      <h3>${rule.title}</h3>
      ${rule.isLocal ? '<span class="local-badge">ローカル</span>' : ""}
    `;
    card.onclick = () => (window.location.href = `rule.html?id=${rule.id}`);
    container.appendChild(card);
  });
}

// ✅ 詳細ページ
async function renderRuleDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const res = await fetch("rules.json");
  const data = await res.json();
  const rule = data.find(r => r.id == id);
  const main = document.getElementById("rule-detail");
  if (rule) main.innerHTML = `<h2>${rule.title}</h2><p>${rule.content}</p>`;
  document.getElementById("addFavoriteBtn").onclick = () => addToFavorites(rule);
}

// ✅ お気に入り追加
function addToFavorites(rule) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.find(f => f.id === rule.id)) {
    favorites.push(rule);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("お気に入りに追加しました！");
  }
}

// ✅ お気に入り一覧
function renderFavorites() {
  const list = document.getElementById("favorites-list");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  list.innerHTML = favorites.length
    ? favorites.map(f => `<div class="rule-card" onclick="window.location.href='rule.html?id=${f.id}'"><h3>${f.title}</h3><p>${f.category}</p></div>`).join("")
    : "<p>お気に入りがありません。</p>";
}

// ✅ ルールフィルター
function filterRules(keyword) {
  localStorage.setItem("searchKeyword", keyword);
  window.location.href = "rules.html";
}
// 🔍 オートサジェスト機能
const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("rules.json");
    const rules = await res.json();

    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();
      suggestions.innerHTML = "";

      if (keyword.length === 0) return;

      const matched = rules
        .filter(r => r.title.toLowerCase().includes(keyword))
        .slice(0, 5);

      matched.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r.title;
        li.onclick = () => (location.href = `rule.html?id=${r.id}`);
        suggestions.appendChild(li);
      });
    });
  } catch (err) {
    console.error("ルールデータの読み込みに失敗:", err);
  }
});

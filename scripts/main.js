// 音乐数据
const musicData = [
  {
    title: "那些你熟悉的旋律",
    artist: "经典音乐合集",
    // cover: "https://example.com/cover1.jpg",
    category: "流行",
  },
  {
    title: "华语R&B精选",
    artist: "Various Artists",
    // cover: "https://example.com/cover2.jpg",
    category: "R&B",
  },
  // 可以添加更多音乐数据
];

// 初始化页面
function initializePage() {
  renderMusicGrid();
  setupEventListeners();
}

// 渲染音乐网格
function renderMusicGrid() {
  const musicGrid = document.querySelector(".music-grid");
  musicGrid.innerHTML = musicData
    .map(
      (music) => `
        <div class="music-card">
            <img src="${music.cover}" alt="${music.title}" onerror="this.src='images/default-cover.jpg'">
            <h3>${music.title}</h3>
            <p>${music.artist}</p>
        </div>
    `
    )
    .join("");
}

// 设置事件监听器
function setupEventListeners() {
  // 播放控制
  const playButton = document.querySelector(".play");
  playButton.addEventListener("click", togglePlay);

  // 分类导航
  const categoryLinks = document.querySelectorAll(".category-nav a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      categoryLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 主题切换
  const themeButton = document.querySelector(".theme-btn");
  themeButton.addEventListener("click", toggleTheme);

  // 初始化主题
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);
}

// 播放/暂停切换
function togglePlay() {
  const playButton = document.querySelector(".play");
  if (playButton.textContent === "播放") {
    playButton.textContent = "暂停";
  } else {
    playButton.textContent = "播放";
  }
}

// 主题切换
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButton(newTheme);
}

// 更新主题按钮图标
function updateThemeButton(theme) {
  const themeButton = document.querySelector(".theme-btn");
  themeButton.textContent = theme === "light" ? "🌙" : "☀️";
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", initializePage);

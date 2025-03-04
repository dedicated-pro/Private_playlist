import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    const isLoggedIn = ref(false);
    const username = ref("");
    const userAvatar = ref("images/default-avatar.jpg");
    const showModal = ref(false);
    const isLoading = ref(false);
    const loginError = ref("");
    const currentSection = ref("featured");
    const musicList = ref([
      {
        title: "那些你熟悉的旋律",
        artist: "经典音乐合集",
        cover: "images/default-cover.jpg",
        category: "流行",
      },
      {
        title: "华语R&B精选",
        artist: "Various Artists",
        cover: "images/default-cover.jpg",
        category: "R&B",
      },
      {
        title: "民谣故事集",
        artist: "民谣歌手",
        cover: "images/default-cover.jpg",
        category: "民谣",
      },
      {
        title: "电子音乐派对",
        artist: "Various Artists",
        cover: "images/default-cover.jpg",
        category: "电子",
      },
      {
        title: "那些你熟悉的旋律",
        artist: "经典音乐合集",
        cover: "images/default-cover.jpg",
        category: "流行",
      },
      {
        title: "华语R&B精选",
        artist: "Various Artists",
        cover: "images/default-cover.jpg",
        category: "R&B",
      },
      {
        title: "民谣故事集",
        artist: "民谣歌手",
        cover: "images/default-cover.jpg",
        category: "民谣",
      },
      {
        title: "电子音乐派对",
        artist: "Various Artists",
        cover: "images/default-cover.jpg",
        category: "电子",
      },
    ]);

    // 不同区域的音乐数据
    const sectionData = {
      featured: [
        {
          title: "精选推荐歌单1",
          artist: "Various Artists",
          cover: "images/default-cover.jpg",
          category: "精选",
        },
        {
          title: "精选推荐歌单2",
          artist: "Various Artists",
          cover: "images/default-cover.jpg",
          category: "精选",
        },
      ],
      liked: [
        {
          title: "我喜欢的歌1",
          artist: "喜欢的歌手",
          cover: "images/default-cover.jpg",
          category: "收藏",
        },
      ],
      recent: [
        {
          title: "最近播放的歌1",
          artist: "最近的歌手",
          cover: "images/default-cover.jpg",
          category: "最近",
        },
      ],
      personal: [
        {
          title: "私人推荐歌单1",
          artist: "推荐歌手",
          cover: "images/default-cover.jpg",
          category: "推荐",
        },
      ],
    };

    // 切换区域
    const switchSection = (section) => {
      currentSection.value = section;
      musicList.value = sectionData[section];
    };

    // 初始化时设置默认数据
    onMounted(() => {
      musicList.value = sectionData.featured;
    });

    const loginForm = ref({
      username: "",
      password: "",
    });

    // 处理图片加载错误
    const handleImageError = (event) => {
      event.target.src = "images/default-cover.jpg";
    };

    // 处理头像加载错误
    const handleAvatarError = (event) => {
      event.target.src = "images/default-avatar.jpg";
    };

    // 检查登录状态
    onMounted(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        isLoggedIn.value = true;
        username.value = user.username;
        userAvatar.value = user.avatar;
      }
    });

    // 显示登录模态框
    const showLoginModal = () => {
      showModal.value = true;
    };

    // 关闭登录模态框
    const closeModal = () => {
      showModal.value = false;
      loginForm.value = { username: "", password: "" };
      loginError.value = "";
    };

    // 处理登录
    const handleLogin = async () => {
      isLoading.value = true;
      loginError.value = "";

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
          loginForm.value.username === "admin" &&
          loginForm.value.password === "password"
        ) {
          const user = {
            username: loginForm.value.username,
            avatar: "images/default-avatar.jpg", // 可以是用户的实际头像URL
          };

          localStorage.setItem("user", JSON.stringify(user));
          isLoggedIn.value = true;
          username.value = user.username;
          userAvatar.value = user.avatar;
          closeModal();
        } else {
          loginError.value = "用户名或密码错误";
        }
      } catch (error) {
        loginError.value = "登录失败，请稍后重试";
      } finally {
        isLoading.value = false;
      }
    };

    // 退出登录
    const logout = () => {
      localStorage.removeItem("user");
      isLoggedIn.value = false;
      username.value = "";
      userAvatar.value = "images/default-avatar.jpg";
    };

    // 主题切换相关代码
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeButton(newTheme);
    };

    const updateThemeButton = (theme) => {
      const themeButton = document.querySelector(".theme-btn");
      themeButton.textContent = theme === "light" ? "🌙" : "☀️";
    };

    // 初始化主题
    onMounted(() => {
      const savedTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);
      updateThemeButton(savedTheme);
    });

    return {
      isLoggedIn,
      username,
      userAvatar,
      showModal,
      isLoading,
      loginError,
      loginForm,
      musicList,
      currentSection,
      showLoginModal,
      closeModal,
      handleLogin,
      logout,
      toggleTheme,
      handleImageError,
      switchSection,
      handleAvatarError,
    };
  },
});

app.mount("#app");

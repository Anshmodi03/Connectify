import { createSlice, configureStore } from "@reduxjs/toolkit";

// --- Auth Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((p) =>
        p._id === updatedPost._id ? updatedPost : p
      );
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Preload persisted auth state from localStorage
const persistedToken = localStorage.getItem("token") || null;
const persistedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
})();

const store = configureStore({
  reducer: authSlice.reducer,
  preloadedState: {
    mode: "dark",
    user: persistedUser,
    token: persistedToken,
    posts: [],
  },
});

export default store;

import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Inject token on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/* AUTH */
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (data) => API.post("/auth/login", data);

/* POSTS */
export const fetchPosts = (page = 1) => API.get(`/posts?page=${page}`);
export const fetchUserPosts = (userId) => API.get(`/posts/${userId}/posts`);
export const createPost = (formData) => API.post("/posts", formData);
export const toggleLike = (postId) => API.patch(`/posts/${postId}/like`);
export const commentOnPost = (postId, content) =>
  API.post(`/posts/comment/${postId}`, { content });
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

/* USERS */
export const fetchUser = (userId) => API.get(`/users/${userId}`);
export const fetchFriends = (userId) => API.get(`/users/${userId}/friends`);
export const addRemoveFriend = (userId, friendId) =>
  API.patch(`/users/${userId}/${friendId}`);
export const updateUser = (userId, data) => API.put(`/users/${userId}`, data);

export default API;

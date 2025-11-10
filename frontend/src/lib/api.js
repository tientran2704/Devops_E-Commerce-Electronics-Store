import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export const api = axios.create({
	baseURL: apiBase
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
	unauthorizedHandler = handler;
};

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			if (typeof unauthorizedHandler === "function") {
				unauthorizedHandler();
			}
		}
		return Promise.reject(error);
	}
);


import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setUnauthorizedHandler } from "../lib/api.js";

const AuthContext = createContext({
	user: null,
	token: null,
	status: "idle",
	isAuthenticated: false,
	login: async () => {},
	register: async () => {},
	logout: () => {},
});

const getStoredAuth = () => {
	try {
		const token = localStorage.getItem("token");
		const userRaw = localStorage.getItem("user");
		const user = userRaw ? JSON.parse(userRaw) : null;
		return { token, user };
	} catch {
		return { token: null, user: null };
	}
};

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [{ token: initialToken, user: initialUser }] = useState(getStoredAuth);
	const [token, setToken] = useState(initialToken);
	const [user, setUser] = useState(initialUser);
	const [status, setStatus] = useState("idle"); // idle | loading | error | ready
	const isFetchingProfile = useRef(false);

	const persistAuth = useCallback((nextToken, nextUser) => {
		if (nextToken) {
			localStorage.setItem("token", nextToken);
		} else {
			localStorage.removeItem("token");
		}
		if (nextUser) {
			localStorage.setItem("user", JSON.stringify(nextUser));
		} else {
			localStorage.removeItem("user");
		}
	}, []);

	const resetAuth = useCallback((redirectToLogin = false) => {
		setToken(null);
		setUser(null);
		setStatus("idle");
		persistAuth(null, null);
		if (redirectToLogin) navigate("/login");
	}, [navigate, persistAuth]);

	useEffect(() => {
		const handler = () => resetAuth(true);
		setUnauthorizedHandler(handler);
		return () => setUnauthorizedHandler(null);
	}, [resetAuth]);

	useEffect(() => {
		if (!token || user || isFetchingProfile.current) return;
		const fetchProfile = async () => {
			isFetchingProfile.current = true;
			setStatus("loading");
			try {
				const { data } = await api.get("/api/users/me");
				setUser(data);
				setStatus("ready");
				persistAuth(token, data);
			} catch {
				resetAuth(true);
			} finally {
				isFetchingProfile.current = false;
			}
		};
		fetchProfile();
	}, [token, user, persistAuth, resetAuth]);

	useEffect(() => {
		if (token && user && status === "idle") {
			setStatus("ready");
		}
	}, [token, user, status]);

	const login = async ({ email, password }) => {
		setStatus("loading");
		try {
			const { data } = await api.post("/api/auth/login", { email, password });
			setToken(data.token);
			setUser(data.user);
			persistAuth(data.token, data.user);
			setStatus("ready");
			return { success: true };
		} catch (error) {
			resetAuth(false);
			const message = error.response?.data?.message || "Đăng nhập thất bại";
			return { success: false, message };
		}
	};

	const register = async ({ name, email, password }) => {
		setStatus("loading");
		try {
			await api.post("/api/auth/register", { name, email, password });
			const loginResult = await login({ email, password });
			if (!loginResult.success) throw new Error(loginResult.message);
			return { success: true };
		} catch (error) {
			setStatus("idle");
			const message = error.response?.data?.message || error.message || "Đăng ký thất bại";
			return { success: false, message };
		}
	};

	const logout = () => {
		resetAuth(true);
	};

	const value = useMemo(
		() => ({
			user,
			token,
			status,
			isAuthenticated: Boolean(user && token),
			login,
			register,
			logout,
		}),
		[user, token, status]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);



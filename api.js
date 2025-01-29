import { TokenProps } from "@/types/auth";
import { cookiesSettings } from "@/utils/constants";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const refreshTokenFunc = async () => {
	const refreshToken = Cookie.get("refreshToken");

	try {
		const rs = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
			{
				refreshToken,
			},
		);

		const { idToken } = rs.data;

		const { exp } = jwtDecode(idToken);
		Cookie.set("idToken", idToken, cookiesSettings);
		const expiresIn = new Date(exp * 1000).toString();
		Cookie.set("expiresIn", expiresIn, cookiesSettings);
		return idToken;
	} catch (error) {
		if (
			error &&
			error.response &&
			error.response.data &&
			error.response.data.error === "session-revoked"
		) {
			Cookie.remove("idToken");
			Cookie.remove("refreshToken");
			Cookie.remove("expiresIn");
			Cookie.remove("role");
			Cookie.remove("signed");
			window.location.reload();
		}
	}
};

export const getToken = async () => {
	const storedIdToken = Cookie.get("idToken");
	const expiresIn = Cookie.get("expiresIn");

	if (storedIdToken && expiresIn) {
		const now = new Date();
		const exp = new Date(expiresIn);
		if (exp < now) {
			return await refreshTokenFunc();
		}
	}
	return storedIdToken;
};

api.interceptors.request.use(
	async (config) => {
		const token = await getToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			((error.response?.status === 401 &&
				!originalRequest.url?.includes("auth")) ||
				error.response?.data?.message === "jwt expired") &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const idToken = await refreshTokenFunc();
				originalRequest.headers.Authorization = `Bearer ${idToken}`;
				return api(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default api;

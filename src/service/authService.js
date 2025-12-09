import axiosClient from "./axiosClient";
import { usersDummy } from "../data/userData";

const USER_KEY = "auth_user";
const TEMP_USER_KEY = "temp_users";

export const authService = {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    },

    async login(email, password) {
        try {
            const res = await axiosClient.post("/auth/login", { email, password });
            const user = res.data;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            return user;
        } catch {
            console.warn("Login API unavailable → using dummy users...");

            let users = JSON.parse(localStorage.getItem(TEMP_USER_KEY));

            if (!users) {
                users = usersDummy;
                localStorage.setItem(TEMP_USER_KEY, JSON.stringify(usersDummy));
            }

            const found = users.find(
                (u) => u.email === email && u.password === password
            );

            if (!found) {
                throw new Error("Email atau password salah!");
            }

            localStorage.setItem(USER_KEY, JSON.stringify(found));
            return found;
        }
    },

    async register({ name, email, password }) {
        try {
            const res = await axiosClient.post("/auth/register", {
                name,
                email,
                password,
                role: "customer"
            });
            return res.data;
        } catch {
            console.warn("Register API unavailable → storing temp user...");

            let tempUsers = JSON.parse(localStorage.getItem(TEMP_USER_KEY));

            if (!tempUsers) {
                tempUsers = [...usersDummy];
            }

            const exists = tempUsers.find((u) => u.email === email);
            if (exists) throw new Error("Email sudah terdaftar!");

            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                role: "customer"
            };

            tempUsers.push(newUser);
            localStorage.setItem(TEMP_USER_KEY, JSON.stringify(tempUsers));

            return newUser;
        }
    },

    logout() {
        localStorage.removeItem(USER_KEY);
    }
};

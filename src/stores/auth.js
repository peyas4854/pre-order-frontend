import { defineStore } from 'pinia';
import router from "@/router";
import JwtService from "@/service/jwt.service";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
        token: null,
        isAuthenticated: false,
        permissions: [],
    }),
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        getCurrentUser: (state) => state.user,
    },
    actions: {
        SET_USER(user) {
            this.user = user;
        },
        SET_TOKEN(token) {
            this.token = token;
            JwtService.saveToken(token);
        },
        SET_AUTHENTICATED(isAuthenticated) {
            console.log('Authenticated:', isAuthenticated);
            this.isAuthenticated = isAuthenticated;
        },
        REDIRECT_AFTER_LOGIN() {
            router.push({ name: 'dashboard' });

        },
        SET_PERMISSIONS(permissions) {
            this.permissions = permissions;  // Commit permissions
        },
    },
    // Enable persistence for the store state
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'auth',
                storage: localStorage,
                paths: ['user', 'token', 'isAuthenticated'],
            },
        ],
    },
});

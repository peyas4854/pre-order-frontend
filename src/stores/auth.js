import {defineStore} from 'pinia';
import router from "@/router";
import ApiService from "@/service/api.service";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
        token: null,
        isAuthenticated: false,
    }),
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        getCurrentUser: (state) => state.user,
    },
    actions: {
        SET_USER(state, user) {
            return state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_AUTHENTICATED(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        REDIRECT_AFTER_LOGIN(state, user) {
            router.push({name: 'dashboard'});
        }
    },


});

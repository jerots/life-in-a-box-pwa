import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        lifeExpectancy: 80,
        birthDate: new Date("1980-01-01")
    },
    getters: {
        lifeLeft(state, getters) {
            return state.lifeExpectancy - getters.currAge;
        },
        currAge(state, getters) {
            const birthDate = state.birthDate;
            const birthYear = birthDate.getFullYear();
            const birthMonth = birthDate.getMonth() + 1;
            const birthDay = birthDate.getDate();

            const todayDate = new Date();
            const todayYear = todayDate.getFullYear();
            const todayMonth = todayDate.getMonth() + 1;
            const todayDay = todayDate.getDate();

            let age = todayYear - birthYear;
            if (birthMonth < todayMonth) {
                age += 1;
            } else if (birthMonth === todayMonth && birthDay <= todayDay) {
                age += 1;
            }
            return age;

        }
    },
    actions: {
        setLifeExpectancy({ commit }, payload) {
            commit("setLifeExpectancy", payload);
        },
        setBirthDate({ commit }, [payload]) {
            commit("setBirthDate", payload);
        }
    },
    mutations: {
        setLifeExpectancy(state, payload) {
            state.lifeExpectancy = payload;
        },
        setBirthDate(state, payload) {
            state.birthDate = payload;
        }
    }
})

export default store;
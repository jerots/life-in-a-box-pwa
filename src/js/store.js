import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'
Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'life-in-a-box',
    storage: window.localStorage
})

const store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        lifeExpectancy: 80,
        birthDateUTC: "1980-01-01T00:00:00+00:00",
        size: 200,
        sizeShouldUpdate: true
    },
    getters: {
        birthDate(state, getters) {
            return new Date(state.birthDateUTC);
        },
        lifeLeft(state, getters) {
            return Math.max(state.lifeExpectancy - getters.currAge, 0);
        },
        currAge(state, getters) {
            const birthDate = getters.birthDate;
            const birthYear = birthDate.getFullYear();
            const birthMonth = birthDate.getMonth() + 1;
            const birthDay = birthDate.getDate();

            const todayDate = new Date();
            const todayYear = todayDate.getFullYear();
            const todayMonth = todayDate.getMonth() + 1;
            const todayDay = todayDate.getDate();

            let age = todayYear - birthYear;
            if (birthMonth > todayMonth) {
                age -= 1;
            } else if (birthMonth === todayMonth && birthDay > todayDay) {
                age -= 1;
            }
            return age;

        }
    },
    actions: {

    },
    mutations: {
        setLifeExpectancy(state, payload) {
            if (state.lifeExpectancy !== payload) {
                state.lifeExpectancy = payload;
                state.sizeShouldUpdate = true;
            }
        },
        setBirthDate(state, [payload]) {
            if (state.birthDateUTC !== payload.toUTCString()) {
                state.birthDateUTC = payload.toUTCString();
                state.sizeShouldUpdate = true;
            }
        },
        setSize(state, payload) {
            state.size = payload;
            state.sizeShouldUpdate = false;
        },
    }
})

export default store;
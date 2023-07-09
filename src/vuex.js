import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const store =  createStore({
    state: {
        user: null
    },
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        user(context, user){
            context.commit('user', user);

        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
});

export default store;
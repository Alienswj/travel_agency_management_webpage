import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentUser: JSON.parse(window.sessionStorage.getItem("user")),
        searchResult: null,
        queryCondition: null,
        pagination: null,
        tripDetails: null
    },
    mutations: {
        initCurrentUser(state, user) {
            state.currentUser = user;
        },
        initSearchResult(state, result) {
            state.searchResult = result;
        },
        initQueryCondition(state, condition) {
            state.queryCondition = condition;
        },
        initGetPagination(state, pagination) {
            state.pagination = pagination;
        },
        initGetTripDetails(state, tripDetails) {
            state.tripDetails = tripDetails;
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})

export default store;
import Vuex from 'vuex';
import Vue from 'vue'

//Load Vuex
Vue.use(Vuex);

//Create Store
const state = {
    //User
    user: null,
    userWasUpdated: false,
    snackBarState: null,
    fbAccessToken: null,
    googleAccessToken: null,
    // Msg Rdy Flag
    // Used for updating the scroll bar 
    // And as a green light to save the img with the doc ID
    msgRdyFlag: false,
    // Messages
    msgTracker: '',
    //Route
    myPath: 'hey'
}

const mutations = {
    // Users & Tokens
    updateUser(state, { user }) {
        Vue.set(state, 'user', user)
    },
    updateUser2(state, user) {
        state.user = user
    },
    updateFBAToken(state, token) {
        state.fbAccessToken = token;
    },
    updateGoogleToken(state, token) {
        state.googleAccessToken = token;
    },
    // Flags
    changeUpdateFlag(state, boolean) {
        state.userWasUpdated = boolean
    },
    updateMsgRdyFlag(state, boolean) {
        state.msgRdyFlag = boolean
    },
    //SnackBar
    callSnackBar(state, snackState) {
        state.snackBarState = snackState;
    },
    // Messages
    updateMsgTracker(state, msg) {
        state.msgTracker = msg;
    },
    // Route
    updateCurrentPath(state, path) {
        state.myPath = path;
    }



}

const actions = {}

const getters = {
    // Users
    userGetter: (state) => {
        return state.user
    },
    fbtGetter: (state) => {
        return state.fbAccessToken
    },
    gtGetter: (state) => {
        return state.googleAccessToken
    },
    // Flags
    updateFlag: (state) => {
        return state.userWasUpdated
    },
    getMsgRdyFlag: (state) => {
        return state.msgRdyFlag
    },
    // Msg
    getMsgTracker: (state) => {
        return state.msgTracker
    },
    //Path
    currentPath: (state) => {
        return state.route
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store
import createDialog from '~/helpers/dialogCreator'

export const state = () => ({
    users: [],
    dialogs: [],
    user: undefined,
    activeDialog: null,
    online: true
})

export const getters = {
    getUsers: (state) => state.users,

    getMessages: (state) => state.dialogs,

    getUser: (state) => state.user,

    getActiveDialog: (state) => state.activeDialog,

    getOnline: (state) => state.online,
}

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    },

    setUser(state, payload) {
        state.user = payload
    },

    addMessage(state, payload) {

        const { author, recipient } = payload

        //немного колхоза, хех)))00
        const dialog = state.dialogs.find(el => el.users.find(user => user.id === author.id) && el.users.find(user => user.id === recipient.id))

        if(!dialog ) state.dialogs.push(createDialog([author, recipient], [payload]))

        else dialog.messages.push(payload)

    },

    selectActive(state, payload) {
        
        const findDialog = () => state.dialogs.findIndex(el => el.users?.find(user => user.id === payload.id))

        const dialog = findDialog()

        if(dialog === -1) {

            state.dialogs.push(createDialog([state.user, payload], []))

            state.activeDialog = findDialog()


        } else state.activeDialog = dialog
    },

    setOnline(state, payload) {
        state.online = payload
    }
}

export const actions = {
    SOCKET_updateUsers({commit}, data) {
        commit("setUsers", data)
    },

    SOCKET_message({commit}, data) {
        commit('addMessage', data)
    },

    async getUserName({commit}) {
        const res = await fetch(`https://randomuser.me/api/`)
        
        const { results } = await res.json()

        const { name, login, picture } = results[0]
  
        const user = { name: name.first, id: login.uuid , avatar: picture.large }

        commit("setUser", user)

        return user
    },

    selectDialog({commit}, data) {
        commit('selectActive', data)
    },

    setUser({commit}, user) {
        commit("setUser", user)
    },

    setOnline({commit}, data) {
        commit('setOnline', data)
    }
}
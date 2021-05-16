<template>
  <v-row class="mt-2 mb-5 main" cols="12">
    <v-col
      v-if="dialogs[activeDialog]"
      class="main-section"
      md="9"
      xl="9"
      lg="9"
    >
      <RecipientProfile :user="recipient" />
      <Dialog :messages="dialogs[activeDialog].messages" />
      <div class="d-flex forms mt-1">
        <input v-model="text" outlined filled placeholder="Start chatting!" class="text" />
        <div @click="message" class="ml-3 mr-7 button">Send message</div>
      </div>
    </v-col>
    <v-col v-else class="main-section" md="9" xl="9" lg="9">
      <div>Выберите диалог</div>
    </v-col>

    <v-col class="dialogs-list" md="3" xl="3" lg="3">
      <UsersList
        @action="selectUser"
        :data="users.filter((el) => el.id !== user.id)"
      />
    </v-col>
  </v-row>
</template>

<script>
//components
import RecipientProfile from '@/components/RecipientProfile'
import UsersList from '@/components/UsersList'
import Dialog from '@/components/Dialog'
//helpers
import { saveData, getData } from '@/helpers/storage'

export default {
  sockets: {
    connect: () => {
      console.log('sockets connected')
    },
  },

  components: {
    RecipientProfile,
    UsersList,
  },

  data: () => ({
    text: null,
    recipient: null,
  }),

  mounted() {
    this.enterChat()
  },

  methods: {
    async enterChat() {
      const user = getData('user')

      if (user) this.$store.dispatch('setUser', user)
      else {
        const newUser = await this.$store.dispatch('getUserName')

        this.$store.dispatch('setUser', newUser)

        saveData('user', newUser)
      }

      this.$socket.emit('enter', this.user)

      this.$socket.emit('getAllUsers')
    },

    message() {
      const msg = {
        author: this.user,
        recipient: this.recipient,
        text: this.text,
        socketId: this.recipient.socketId,
        created: new Date()
      }

      this.$socket.emit('newMessage', msg)

      this.$store.dispatch('selectDialog', this.recipient)

      this.text = null
    },

    selectUser(data) {
      this.recipient = data

      this.$store.dispatch('selectDialog', data)
    },
  },

  computed: {
    users() {
      return this.$store.getters.getUsers
    },

    dialogs() {
      return this.$store.getters.getMessages
    },

    activeDialog() {
      return this.$store.getters.getActiveDialog
    },

    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>


<style scoped>
.main {
  height: 650px;
}

.forms {
  position: absolute;
  bottom: 20px;
  width: 98%;
  height: 40px;
}

.text {
  width: 75%;
  padding-left: 10px;
  background-color: white;
  border-radius: 5px;
}

.text:focus {
  outline: none !important;
  border: 2px solid #74b9ef;
}

.main-section {
  position: relative;
  background-color: #d7dfe7;
}

.dialogs-list {
  background-color: white;
  padding: 0 0;
}

.button {
  width: 195px;
  background-color: #428bca;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding-top: 10px;
  cursor: pointer;
  user-select: none;
}
</style>

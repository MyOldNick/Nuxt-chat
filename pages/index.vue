<template>
  <v-row class="mt-2 mb-5 main" cols="12" style="overflow-x: hidden">
    <v-col
      v-if="dialogs[activeDialog]"
      class="main-section"
      md="9"
      xl="9"
      lg="9"
    >
      <RecipientProfile :user="recipient" @action="openMenu" />
      <Dialog :messages="dialogs[activeDialog].messages" />
      <div class="d-flex forms mt-1">
        <input
          v-model="text"
          outlined
          filled
          placeholder="Start chatting!"
          class="message-input"
        />
        <div @click="message" class="ml-3 mr-7 button">Send message</div>
      </div>
    </v-col>
    <v-col v-else class="main-section" md="9" xl="9" lg="9">
      <div @click="openMenu">Выберите диалог (Кликнуть сюда)</div>
    </v-col>

    <v-col
      ref="dialogs"
      :class="[
        'dialogs-list',
        isOpen ? 'dialogs-list-open' : 'dialogs-list-closed',
      ]"
      md="3"
      xl="3"
      lg="3"
    >
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
    isOpen: false,
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
      if (this.text && this.text.length > 0 && this.text.match(/[^\s]+/)) {

        const msg = {
          author: this.user,
          recipient: this.recipient,
          text: this.text,
          socketId: this.recipient.socketId,
          created: new Date(),
        }

        this.$socket.emit('newMessage', msg)

        this.$store.dispatch('selectDialog', this.recipient)

        this.text = null

      }
    },

    selectUser(data) {
      this.recipient = data

      this.$store.dispatch('selectDialog', data)

      this.isOpen = false
    },

    openMenu() {
      this.isOpen = !this.isOpen
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

.message-input {
  width: 75%;
  padding-left: 10px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.message-input:focus {
  outline: none !important;
  border: 2px solid #74b9ef;
}

.main-section {
  position: relative;
  background-color: #d7dfe7;
}

.dialogs-list {
  position: relative;
  background-color: white;
  padding: 0 0;
  transition: 0.3s;
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

@media (max-width: 425px) {
  .dialogs-list {
    position: absolute;
    height: 650px;
  }
  .dialogs-list-open {
    left: 0;
  }

  .dialogs-list-closed {
    left: -100%;
  }
}
</style>

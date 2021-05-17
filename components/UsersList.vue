<template>
  <div class="list-container">
    <UsersListNav />
    <UserCard
      @action="clickUser"
      v-for="el in online
        ? filteredUsers.filter((el) => el.online)
        : filteredUsers"
      :user="el"
      :key="el.id"
      :online="el.online"
      :active="el.id === activeDialog ? true : false"
    />
    <div class="pr-3 pl-3 list-form-container">
      <input class="list-form" placeholder="Search..." v-model="value" />
    </div>
  </div>
</template>

<script>
//components
import UserCard from './UserCard'
import UsersListNav from './UsersListNav'
//helpers
import filterUsers from '@/helpers/filter'

export default {
  components: {
    UserCard,
  },
  props: ['data'],

  data: () => ({
    activeDialog: null,
    value: null,
  }),

  methods: {
    clickUser(data) {
      this.activeDialog = data.id
      this.$emit('action', data)
    },
  },

  computed: {
    online() {
      return this.$store.getters.getOnline
    },

    filteredUsers() {
      return filterUsers(this.value, this.data, 'name')
    },
  },
}
</script>

<style scoped>
.list-container {
  background-color: white;
}

.list-form-container {
  position: absolute;
  width: 100%;
  bottom: 20px;
}

.list-form {
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.list-form:focus {
  outline: none !important;
  border: 2px solid #74b9ef;
}
</style>
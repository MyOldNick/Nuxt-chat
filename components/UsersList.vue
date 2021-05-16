<template>
  <div class="list-container">
    <UsersListNav />
    <UserCard
      @action="clickUser"
      v-for="el in online ? data.filter((el) => el.online) : data"
      :user="el"
      :key="el.id"
      :online="el.online"
      :active="el.id === activeDialog ? true : false"
    />
  </div>
</template>
<script>
import UserCard from './UserCard'
import UsersListNav from './UsersListNav'

export default {
  components: {
    UserCard,
  },
  props: ['data'],

  data: () => ({
    activeDialog: null,
  }),

  methods: {
    clickUser(data) {
      this.activeDialog = data.id
      this.$emit('action', data)
    },
  },

  computed: {
    allUsers() {
      return this.$store.getters.getAllUsers
    },

    online() {
      return this.$store.getters.getOnline
    },
  },
}
</script>
<style scoped>
.list-container {
  background-color: white;
}
</style>
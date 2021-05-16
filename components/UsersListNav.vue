<template>
  <div class="list-select-users d-flex">
    <div @click="chooseUsersList" :class="['list-button', !online && 'list-button-disabled']">
      <p class="list-text">Online</p>
    </div>
    <div @click="chooseUsersList" :class="['list-button', online && 'list-button-disabled']">
      <p class="list-text">All</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    chooseUsersList() {
      this.$store.dispatch('setOnline', !this.online)
    }
  },

  computed: {
    online() {
      return this.$store.getters.getOnline
    }
  }
}
</script>

<style scoped>
.list-select-users {
  height: 100%;
  min-height: 50px;
}

.list-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  user-select: none;
  cursor: pointer;
}

.list-button-disabled {
  background-color: #f8f8f8;
  border: 1px solid #dddddd;
}

.list-text {
  margin-bottom: 0;
}
</style>
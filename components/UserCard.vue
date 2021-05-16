<template >
  <div @click="click" :class="['d-flex', 'pt-3', 'pb-3', 'pl-3', 'pr-3', 'user-card', active && 'user-card-active']">
    <div :class="{'user-card-avatar': online}">
      <v-avatar rounded size="60">
        <v-img :src="user.avatar" />
      </v-avatar>
    </div>
    <h4 class="ml-3">{{ user.name }}</h4>
  </div>
</template>

<script>
export default {
  props: ['user', 'online', 'active'],

  methods: {
    click() {
        this.$emit('action', this.user)
    }
  }
}
</script>

<style scoped>

.user-card {
  cursor: pointer;
  user-select: none;
}

.user-card-avatar {
  position: relative;
}
.user-card-avatar::after {
  display: block;
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 15px;
  height: 15px;
  background-color: #20d63e;
  border-radius: 50%;
  content: '';
}

.user-card-active {
  background-color: #f8f8f8;
}
</style>
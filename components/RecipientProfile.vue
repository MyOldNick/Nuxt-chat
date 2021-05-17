<template>
  <v-row cols="12">
    <v-img class="profile-avatar" :src="user.avatar" />
    <v-col class="profile-info pl-5">
      <h2>{{ user.name }}</h2>
      <p>Per aspera ad astra</p>
      <div @click="openMenu" class="profile-open-button">Открыть меню</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['user'],

  methods: {
    openMenu() {
      this.$emit('action')
    },
  },
}
</script>

<style scoped>
.profile-avatar {
  width: 100%;
  height: 100%;
  max-width: 170px;
  max-height: 170px;
}

.profile-info {
  background-color: #becbd9;
}

.profile-open-button {
  display: none;
  padding: 2px;
  text-align: center;
  background-color: white;
  border-radius: 5px;
}

@media (max-width: 425px) {
  .profile-open-button {
    display: block;
  }
}
</style>
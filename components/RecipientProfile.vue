<template>
  <v-row cols="12">
    <v-img
      class="profile-avatar"
      :src="user.avatar"
    />
    <v-col class="profile-info">
      <h3>{{user.name}}</h3>
      <p>LOREM LORE MTEXT LOREM TEXT TEXT JSDKFSDJKFNSDJ</p>
    </v-col>
  </v-row>
</template>
<script>

export default {
    props: ['user']
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
</style>
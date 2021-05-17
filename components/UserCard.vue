<template >
  <div
    @click="click"
    :class="[
      'd-flex',
      'pt-3',
      'pb-3',
      'pl-3',
      'pr-3',
      'user-card',
      active && 'user-card-active',
    ]"
  >
    <div :class="{ 'user-card-avatar': online }">
      <v-avatar rounded size="60">
        <v-img :src="user.avatar" />
      </v-avatar>
    </div>
    <div class="ml-3">
      <h4>{{ user.name }}</h4>
      <p class="user-card-last-message" v-if="dialog && dialog.messages.length">
        {{ dialog.messages[dialog.messages.length - 1].text.substr(0, 25) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'online', 'active'],

  methods: {
    click() {
      this.$emit('action', this.user)
    },
  },

  computed: {
    dialog() {
      return this.$store.getters.getMessages.find((el) =>
        el.users.find((us) => this.user.id === us.id)
      )
    },
  },
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

.user-card-last-message {
  color: grey
}
</style>
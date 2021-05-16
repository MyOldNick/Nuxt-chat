<template>
  <div
    :class="[
      'message-container',
      user.id === author.id
        ? 'message-container-user'
        : 'message-container-recipient',
    ]"
  >
    <div
      :class="[
        'ml-4',
        'mr-5',
        'message',
        user.id === author.id ? 'message-user' : 'message-recipient',
      ]"
    >
      <div
        :class="[
          'message-top',
          user.id === author.id ? 'message-top-user' : 'message-top-recipient',
        ]"
      >
        <p class="message-author-name">{{ author.name }}</p>
        <p class="message-time">{{ getStringDate(created) }}</p>
      </div>
      <div class="message-content">
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['author', 'text', 'created'],

  methods: {
    getStringDate(data) {
      const date = new Date(data)

      return date.toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      })
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>
<style scoped>
.message-container {
  width: 100%;
  display: flex;
}
.message-container-recipient {
  justify-content: flex-start;
}

.message-container-user {
  justify-content: flex-end;
}

.message {
  position: relative;
  width: 100%;
  max-width: 80%;
  border-radius: 8px 8px;
  box-shadow: 5px 5px 5px -2px rgba(34, 60, 80, 0.2);
}

.message-recipient {
  box-shadow: 5px 5px 5px -2px rgba(34, 60, 80, 0.2);
}

.message-user {
  box-shadow: 5px 5px 5px -2px rgba(34, 60, 80, 0.2);
}

.message-top {
  display: flex;
  justify-content: space-between;
  height: 35px;
  padding: 7px 15px;
  border-radius: 8px 8px 0px 0px;
}

.message-top-recipient {
  background-color: #becbd9;
}

.message-top-user {
  background-color: #f0cbb3;
}

.message-content {
  max-width: 100%;
  min-height: 35px;
  padding: 10px 15px;
  /* padding-top: 8px;
  padding-left: 15px;
  padding-right: 15px; */
  padding-bottom: 1px;
  background-color: white;
  border-radius: 0px 0px 8px 8px;
}

.message-content p {
  word-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 10px;
}

.message-recipient::before {
  display: block;
  position: absolute;
  top: 50px;
  left: -8px;
  width: 16px;
  height: 16px;
  background-color: white;
  content: '';
  transform: rotate(45deg);
}

.message-user::after {
  display: block;
  position: absolute;
  top: 50px;
  right: -8px;
  width: 16px;
  height: 16px;
  background-color: white;
  content: '';
  transform: rotate(45deg);
  box-shadow: 5px -4px 5px -1px rgba(34, 60, 80, 0.2);
}

.message-time {
  opacity: 0.3;
}

.message-author-name {
  opacity: 0.7;
  font-weight: bold;
}
</style>
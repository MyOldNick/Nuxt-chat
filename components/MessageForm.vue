<template>
  <div class="d-flex form-container mt-1">
    <input
      v-model="text"
      outlined
      filled
      placeholder="Start chatting!"
      class="message-input"
    />
    <div @click="message" class="ml-3 mr-7 button">Send message</div>
  </div>
</template>

<script>
export default {
    data: () => ({
        text: null
    }),

    methods: {
        message() {
            this.$emit('action', this.text)

            this.text = null
        }
    }
}
</script>

<style scoped>
.form-container {
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
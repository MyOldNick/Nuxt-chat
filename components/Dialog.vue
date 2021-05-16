<template>
  <div class="dialog mt-6" ref="dialog">
    <Message class="mt-5" v-for="el in messages" :key="el.id" :author="el.author" :text="el.text" :created="el.created"/>
  </div>
</template>

<script>
//components
import Message from './Message'

export default {
  props: ['messages'],
  components: {
      Message
  },

  updated() {
      const el = this.$refs.dialog

      if(el) el.scrollTop = el.lastElementChild.offsetTop;
  }
}
</script>

<style scoped>
.dialog {
    height: 100%;
    max-height: 400px;
    padding-bottom: 5px;
    overflow-x: hidden;
    overflow-y: auto;
}

::-webkit-scrollbar {
  width: 10px;
  background: #becbd9;
  opacity: 0;
  transition: 0.3s;
  border-radius: 25pt;
}

::-webkit-scrollbar-thumb {
  background: #9daab9;
  border: 4px solid transparent;
  border-radius: 8px;
}

</style>
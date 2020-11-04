<template>
<div class="main-login min-h-full">
  <div class="h-screen">
    <form >
      <input type="text" placeholder="username">
    </form>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login',
  data: () => ({
  }),
  methods: {
  }
})
</script>

<style lang="scss">
.main-login{
  background-image:linear-gradient(rgba(22,22,22,0.3)0%,rgba(22,22,22,0.7)75%,#161616 100%),url('../assets/pic/login-back.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
}
</style>

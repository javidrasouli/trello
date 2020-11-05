<template>
  <div class="conteiner">
<section  class="index-page-tasks">
        <div class="  grid grid-rows-1 grid-cols-2">
          <h3 class="bg-orange-300">test 1</h3>
        </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    tasks: {},
    isOpen: false,
    editTask: {}
  })
})
</script>
<style lang="scss">
</style>

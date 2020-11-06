<template>
  <div class="conteiner">
<section  class="index-page-tasks">
        <div class="partion-tasks">
          <div class=" bg-blue-400 m-3 p-2 opacity-75 rounded-lg flex text-gray-300">
             <h2 class="">create task</h2>
             <h3 class="m-auto cursor-pointer text-pink-900"><i class="fa fa-eye"></i></h3>
             <h3 class="m-auto cursor-pointer text-red-600"><i class="fa fa-check"></i></h3>
          </div>
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
.partion-tasks{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}
@media screen and (min-width: 500px) {
.partion-tasks{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:1fr 1fr;
}
}
@media screen and (min-width: 1000px) {
.partion-tasks{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:1fr 1fr 1fr;
}
}
@media screen and (min-width: 1200px) {
.partion-tasks{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns:1fr 1fr 1fr 1fr;
}
}
</style>

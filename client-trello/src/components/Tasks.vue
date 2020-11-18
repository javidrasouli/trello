<template>
  <div class="conteiner">
<section  class="index-page-tasks">
        <div class="partion-tasks">
          <div v-for="task in Tasks" :key="task._id" class=" bg-blue-400 m-3 p-2 opacity-75 rounded-lg flex text-gray-300">
             <h2 @click="show = true" class="m-auto cursor-pointer" v-text="task.name"></h2>
          </div>
        </div>
    </section>
    <transition name="fadeIn">
    <div v-if="show" @click.self="show = !show" class="modal-mask grid grid-rows-1 items-center">
      <show v-if="show"/>
    </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { getTasks, taskUser } from '../Model/lists'
import showTask from './Modal/showTask.vue'
export default defineComponent({
  name: 'Tasks',
  components: {
    show: showTask
  },
  data: () => ({
    show: false,
    Tasks: {}
  }),
  created () {
    getTasks().then(() => {
      this.Tasks = taskUser.value
    })
  }
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.fadein-enter-active, .fadein-leave-active {
  transition: opacity .5s
}

.fadein-enter-from, .fadein-leave-to {
  opacity: 0
}
</style>

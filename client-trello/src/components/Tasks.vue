<template>
  <div class="conteiner">
<section class="index-page-tasks">
  <div class="partion-tasks">
     <span v-for="task in change" :key="task._id">
        <div class=" bg-blue-400 m-3 p-2 opacity-75 rounded-lg flex text-gray-300">
        <h2 @click="showmodal(task)" class="m-auto cursor-pointer" v-text="task.name"></h2>
     </div>
     </span>
</div>
</section>
    <transition name="fadeIn">
    <div v-if="show" @click.self="show = !show" class="modal-mask grid grid-rows-1 items-center">
      <show v-if="show" :task = "task" @close = 'close' />
    </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { AllTasks, getTasks, taskUser } from '../Model/lists'
import showTask from './Modal/showTask.vue'
export default defineComponent({
  name: 'Tasks',
  props: ['Todo', 'Done', 'miniNav'],
  components: {
    show: showTask
  },
  data: () => ({
    show: false,
    Tasks: {},
    task: {}
  }),
  created () {
    if (this.$props.miniNav) {
      AllTasks().then(() => {
        this.Tasks = taskUser.value
      })
    } else {
      getTasks(true).then(() => {
        this.Tasks = taskUser.value
      })
    }
  },
  computed: {
    change (): any {
      let tasks = {}
      if (this.$props.Todo === true) {
        tasks = taskUser.value
      }
      if (this.$props.Done === true) {
        tasks = taskUser.value
      }
      return tasks
    }
  },
  methods: {
    showmodal (Task: {}) {
      this.task = Task
      this.show = true
    },
    close (close: boolean) {
      this.show = close
    }
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

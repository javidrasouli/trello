<template>
  <div class="conteiner">
<section  class="index-page-tasks">
        <div class="task">
          <h3 class="task-text">test 1</h3>
        </div>
        <div class="task2">
          <h3>test 2</h3>
        </div>
        <div class="task3">
          <h3>test 3</h3>
        </div>
        <div class="task4">
          <h3>test 4</h3>
        </div>
        <div class="text-6xl">
  Test
</div>
    </section>
<div class="overlay" v-if="isOpen" @click.self="isOpen = false">
        <modal v-if="isOpen" :editTask = 'editTask' @close-task = 'closeTask'/>
</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { taskUser, getMemberTask } from '../Model/lists'
import editTask from './Modal/EditTask.vue'
export default defineComponent({
  data: () => ({
    tasks: {},
    isOpen: false,
    editTask: {}
  }),
  components: {
    modal: editTask
  },
  created () {
    this.tasks = taskUser.value
  },
  methods: {
    Task (task: any) {
      getMemberTask({ id: task.userID }).then(() => {
        this.editTask = task
        this.isOpen = true
      })
    },
    closeTask (close: boolean) {
      this.isOpen = close
    }
  }
})
</script>
<style lang="scss">
.task{
  margin: 0.5rem;
  padding:0.75rem;
  width: 200px;
  height: 70px;
  border-radius: 40px;
  background-color: red;
  color: #fff;
}
.task2{
  margin: 0.5rem;
  padding:0 0.75rem;
  width: 200px;
  height: 70px;
  border-radius: 40px;
  background-color: rgb(251, 255, 0);
  color: #333;
}
.task3{
  margin: 0.5rem;
  padding:0 0.75rem;
  width: 200px;
  height: 70px;
  border-radius: 40px;
  background-color: rgb(0, 255, 149);
  color: #fff;
}
.task4{
  margin: 0.5rem;
  padding:0 0.75rem;
  width: 200px;
  height: 70px;
  border-radius: 40px;
  background-color: rgb(255, 0, 179);
  color: #fff;
}
@media screen and (min-width: 750px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 980px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1200px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>

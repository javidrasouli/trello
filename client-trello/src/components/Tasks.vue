<template>
  <div class="conteiner">
<table class="Table-task" v-if="tasks.length > 0">
  <thead class="Table-task-head">
    <th>
      <tr>Task</tr>
    </th>
  </thead>
<tbody class="Table-task-body">
    <tr v-for="task in tasks" :key="task._id">
    <td class="task-name" v-text="task.name" @click="Task(task)"></td>
  </tr>
</tbody>
</table>
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
.Table-task{
  margin: auto;
  margin-top:2rem;
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
}
.Table-task-head{
  & th{
   padding:1rem 2rem;
  }
}
.Table-task-body{
  color: #333;
  & td{
    padding:1rem 2rem;
  }
}
.task-name{
  cursor: pointer;
  &:hover{
    color: rgb(255, 0, 0);
  }
}
</style>

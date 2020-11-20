<template>
<div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto bg-gray-500 bg-opacity-75 rounded-xl p-5">
<h1 class="text-2xl border-b" v-text='task.name'></h1>
<h3 class="mt-2" v-text="task.description"></h3>
<div class="mt-5 flex">
  <button @click="close()" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
  <button v-if="task.status === 0" @click="Done()" type="button" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Done!</button>
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Done, errorList, getTasks } from '../../Model/lists'
export default defineComponent({
  name: 'showTask',
  props: ['task'],
  data: () => ({
    error: ''
  }),
  methods: {
    Done () {
      const oldTask = this.$props.task
      const newTask = { _id: oldTask._id, name: oldTask.name, description: oldTask.description, status: 1, person: oldTask.person }
      Done(oldTask, newTask).then(() => {
        if (errorList.value.length > 1) {
          this.error = errorList.value
        } else {
          getTasks(true).then(() => {
            this.$emit('close', false)
          })
        }
      })
    },
    close () {
      this.$emit('close', false)
    }
  }
})
</script>

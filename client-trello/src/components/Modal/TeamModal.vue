<template>
    <div class="w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto bg-gray-700 rounded-xl p-5">
     <transition
    name="showtask-profile"
    mode="out-in"
  >
     <div v-if="showTeam" >
         <h1 class="text-2xl border-b px-2" v-text="team.person"></h1>
         <div v-if="team.taskID != ''">
             <h1 class="p-2 text-xl text-gray-500" v-text="taskTeam.name"></h1>
         <h1 v-text="taskTeam.description"></h1>
         </div>
         <div v-else>
            <h1 class="text-xl px-2 text-gray-500 ">person has not any Task</h1>
         </div>
         <div class="flex my-3">
          <button @click="showEdit = true, showTeam = false, showDelete = false" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">edit</button>
          <button @click="showEdit = false, showTeam = false, showDelete = true" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">delete</button>
          <button @click="close()" type="button" class="m-auto bg-yellow-500 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
         </div>
     </div>
     <div v-else-if="showEdit" >
         <h1 class="text-2xl border-b px-2 mb-3">javid</h1>
         <label>
             <span class="text-gray-200">select Task :</span>
             <select
          name="person"
          v-model="taskForTeam"
          class=" p-2 rounded-lg outline-none w-full self-center cursor-pointer focus:bg-gray-400"
        >
          <option value="">....</option>
          <option v-for= "task in tasksBoard" :key="task._id" :value="task._id" v-text="task.name"></option>
        </select>
         </label>
        <div class="flex mt-2">
     <button @click="update()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">save</button>
      <button @click="showEdit = false, showTeam = true, showDelete = false" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
     </div>
     <div v-else-if="showDelete" >
         <h1 class="text-gray-200 text-lg">do you want delete <span class="text-red-700 text-2xl" v-text="team.person"></span> of Team ???</h1>
        <div class="flex mt-2">
     <button @click="remove()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">delete</button>
      <button @click="showEdit = false, showTeam = true, showDelete = false" type="button" class="m-auto bg-yellow-500 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
     </div>
     </transition>
     <div v-if="modal" @click.self="modal = !modal" class="modal-mask grid grid-rows-1 items-center">
      <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-red-700 text-gray-100"></p>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateList, updateTeam, errorList, removeTeam } from '../../Model/lists'
export default defineComponent({
  name: 'TeamModal',
  props: ['team', 'tasksBoard'],
  data: () => ({
    showTeam: true,
    showEdit: false,
    showDelete: false,
    taskTeam: {},
    taskForTeam: '',
    error: '',
    modal: false
  }),
  created () {
    const tasks = this.$props.tasksBoard
    const team = this.$props.team
    if (team.taskID !== '') {
      for (const task of tasks) {
        if (task._id === team.taskID) {
          this.taskTeam = task
          this.taskForTeam = task._id
        }
      }
    }
  },
  methods: {
    update () {
      const team = this.$props.team
      let task = '....'
      let taskID = ''
      if (this.taskForTeam !== '') {
        for (const taskboard of this.$props.tasksBoard) {
          if (taskboard._id === this.taskForTeam) {
            task = taskboard.name
            taskID = taskboard._id
          }
        }
      }
      const newTeam = { _id: team._id, person: team.person, boardID: team.boardID, taskID: taskID, task: task }
      updateTeam(this.$props.team, newTeam).then(() => {
        if (errorList.value.length > 1) {
          this.modal = true
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    remove () {
      removeTeam(this.$props.team).then(() => {
        if (errorList.value.length > 1) {
          this.modal = true
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    close () {
      this.$emit('close', false)
    }
  }
})
</script>

<template>
    <div class="p-3 bg-gray-300 w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto rounded-md flex flex-col">
    <div v-if="addTask" class="w-full">
      <input v-model="nameTask" placeholder="Task name" type="text" class="m-2 p-2 w-full rounded-lg focus:outline-none focus:bg-gray-400">
    <textarea v-model="descriptionTask" placeholder="Task description" rows="8" class="m-2 w-full p-2 rounded-lg focus:outline-none focus:bg-gray-400"></textarea>
        <select
          name="person"
          v-model="person"
          class=" p-2 rounded-lg outline-none w-full self-center cursor-pointer focus:bg-gray-400"
        >
          <option value="" disabled>person of Team :</option>
          <option value="....">....</option>
          <option v-for="team in Teams" :key="team._id" :value="team.person" v-text="team.person"></option>
        </select>
    <div class="flex mt-2">
     <button @click="save()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">save</button>
      <button @click="close()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
    <transition
    name="showtask-profile"
    mode="out-in"
  >
    <div v-if="editOpen" class="w-full">
      <input v-model="nameTask" placeholder="Task name" type="text" class="m-2 p-2 w-full rounded-lg focus:outline-none focus:bg-gray-400">
    <textarea v-model="descriptionTask" placeholder="Task description" rows="8" class="m-2 p-2 w-full rounded-lg focus:outline-none focus:bg-gray-400"></textarea>
        <select
          name="person"
          v-model="person"
          class=" p-2 rounded-lg outline-none w-full self-center cursor-pointer focus:bg-gray-400"
        >
          <option value="" v-text="task.person"></option>
          <option value="....">....</option>
          <option v-for="team in Teams" :key="team._id" :value="team.person" v-text="team.person"></option>
        </select>
    <div class="flex mt-2">
     <button @click="edit()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Edit</button>
     <button @click="delTask = !delTask, editOpen = !editOpen" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">delete</button>
      <button @click="close()" type="button" class="m-auto bg-yellow-500 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
    <div v-else-if="delTask" class="w-full">
      <h1 class="text-gray-700 text-lg">do you want delete <span v-text="task.name" class="text-red-700 text-2xl"></span> ???</h1>
    <div class="flex mt-2">
     <button @click="deleted()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">delete</button>
      <button @click="close()" type="button" class="m-auto bg-yellow-500 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
    </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AddTask, deletedTask, errorList, Team, TeamBoard, updateTask } from '../../Model/lists'
export default defineComponent({
  name: 'modalTask',
  props: ['boardList', 'list', 'addTask', 'EditTask', 'task'],
  data: () => ({
    nameTask: '',
    descriptionTask: '',
    person: '',
    error: '',
    Teams: {},
    delTask: false,
    editOpen: false
  }),
  created () {
    this.editOpen = this.$props.EditTask
    Team(this.$props.boardList).then(() => {
      this.Teams = TeamBoard.value
      if (this.$props.EditTask === true) {
        const task = this.$props.task
        this.nameTask = task.name
        this.descriptionTask = task.description
      }
    })
  },
  methods: {
    save () {
      const board = this.$props.boardList
      const list = this.$props.list
      const Task = { name: this.nameTask, description: this.descriptionTask, boardID: board._id, listID: list._id, person: this.person }
      AddTask(Task).then(() => {
        if (errorList.value.length > 1) {
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    close () {
      this.$emit('close', false)
    },
    edit () {
      const oldTask = this.$props.task
      const newTask = { _id: oldTask._id, name: this.nameTask, description: this.descriptionTask, boardID: oldTask.boardID, listID: oldTask.listID, person: this.person }
      updateTask(oldTask, newTask).then(() => {
        if (errorList.value.length > 1) {
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    deleted () {
      deletedTask(this.$props.task).then(() => {
        if (errorList.value.length > 1) {
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    }
  }
})
</script>

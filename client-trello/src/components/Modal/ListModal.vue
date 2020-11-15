<template>
    <div class="bg-gray-200 p-3 w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto rounded-md">
    <div v-if="editModal" class="flex flex-col">
    <input v-model="nameList" placeholder="List Name" type="text" class="w-2/3 m-auto p-2 rounded-md focus:outline-none bg-gray-400 focus:bg-gray-500">
    <div class="flex mt-2">
     <button @click="edit()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Edit</button>
      <button @click="close()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
    <div v-if="!editModal" class="flex">
        <h1 class="m-auto text-lg">Do you want delete <span v-text="nameList" class="text-red-700 text-xl"></span> ?</h1>
           <button @click="deleted()" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">delete</button>
           <button @click="close()" type="button" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateList, errorList, deletedList } from '../../Model/lists'
export default defineComponent({
  name: 'listModal',
  props: ['list', 'deletedList'],
  data: () => ({
    nameList: '',
    error: '',
    editModal: true
  }),
  created () {
    this.nameList = this.$props.list.name
    this.editModal = true
    if (this.$props.deletedList === true) {
      this.editModal = false
    }
  },
  methods: {
    edit () {
      const list = this.$props.list
      const newList = { _id: list._id, name: this.nameList, boardID: list.boardID }
      updateList(list, newList).then(() => {
        if (errorList.value.length > 1) {
          this.error = errorList.value
        } else {
          this.$emit('close', false)
        }
      })
    },
    deleted () {
      const list = this.$props.list
      deletedList(list).then(() => {
        if (errorList.value.length > 1) {
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

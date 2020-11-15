<template>
    <div class="p-3 bg-gray-200 w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto rounded-md flex flex-col">
    <input v-model="nameTask" placeholder="Task name" type="text" class="m-2 p-2 bg-teal-400 rounded-lg focus:outline-none focus:bg-gray-400">
    <textarea v-model="descriptionTask" placeholder="Task description" rows="8" class="m-2 p-2 rounded-lg bg-teal-400 focus:outline-none focus:bg-gray-400"></textarea>
    <label>
        <span>person of Team :</span>
        <select
          id="cars"
          name="cars"
          v-model="person"
          class=" bg-teal-400 p-2 rounded-lg outline-none w-full self-center cursor-pointer"
        >
          <option value="volvo">....</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab praid</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
    </label>
    <div class="flex mt-2">
     <button @click="save()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">save</button>
      <button @click="close()" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AddTask, errorList } from '../../Model/lists'
export default defineComponent({
  name: 'modalTask',
  props: ['boardList', 'list'],
  data: () => ({
    nameTask: '',
    descriptionTask: '',
    person: '',
    error: ''
  }),
  methods: {
    save () {
      const board = this.$props.boardList
      const list = this.$props.list
      const Task = { name: this.nameTask, description: this.descriptionTask, boardID: board._id, listID: list._id, person: this.person }
      console.log(this.person)
    //   AddTask(Task).then(() => {
    //     if (errorList.value.length > 1) {
    //       this.error = errorList.value
    //     } else {
    //       this.$emit('close', false)
    //     }
    //   })
    },
    close () {
      this.$emit('close', false)
    }
  }
})
</script>

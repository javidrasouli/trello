<template>
  <div>
    <div class="partion-tasks">
      <div v-for="list in lists" :key="list._id" class=" bg-indigo-700 rounded-xl p-4 m-2 min-w-48">
        <div class="border-b flex">
          <h1 v-text="list.name" class="text-white text-xl m-auto"></h1>
          <h3 class="m-auto cursor-pointer text-white mt-2">
            <i @click="editList(list)" class="fa fa-edit"></i>
          </h3>
          <h3 class="m-auto cursor-pointer text-white mt-2">
            <i @click="remove(list)" class="fa fa-remove"></i>
          </h3>
        </div>
        <div v-for="task in tasks" :key="task._id">
        <div v-if="list._id === task.listID" class="grid grid-rows-1 grid-cols-1">
          <div class=" bg-green-500 my-3 p-2 rounded-lg text-white" >
            <h2 @click="editTask(task)" v-text="task.name" class="cursor-pointer"></h2>
          </div>
        </div>
        </div>
        <div class="text-gray-300 bg-gray-500 mt-2 rounded-md p-1 hover:text-black ">
          <h1 @click="AddTask(list)" class="cursor-pointer">create Task</h1>
        </div>
      </div>
      <transition
    name="showtask-profile"
    mode="out-in"
  >
      <div v-if="!AddList"
      @click="AddList = true"
        class=" bg-transparent rounded-xl max-w-46 h-40 m-2 border-dashed border-4 border-gray-600 bg-gray-400 opacity-25 grid grid-rows-1 grid-cols-1 relative cursor-pointer"
      >
        <span
          class="border-dashed border-2 border-gray-600 absolute addlist-y z-0"
        ></span>
        <span
          class=" border-dashed border-2 border-gray-600 absolute addlist-x z-10"
        ></span>
      </div>
      <div v-else
        class=" bg-transparent rounded-xl w-48 h-48 m-2 p-3 border-dashed border-4 border-gray-400 bg-gray-500 grid grid-rows-1 grid-cols-1 relative"
      >
      <input v-model="nameList" placeholder="List Name" type="text" class="p-1 bg-gray-300 h-10 rounded-md focus:outline-none focus:bg-gray-400 ">
      <div class="flex">
       <button @click="Add()" class="m-auto bg-green-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">save</button>
       <button @click="AddList = false" type="button" class="m-auto bg-red-700 p-2 rounded-lg text-gray-200 outline-none focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">cancel</button>
     </div>
      </div>
      </transition>
    </div>
    <div v-if="modal" @click.self="modal = !modal" class="modal-mask grid grid-rows-1 items-center">
         <list-modal v-if="edit" :list = 'list' :deletedList = 'deletedList' @close = 'close'/>
         <task-modal v-if="addTasks" :task ='task' :list = 'list' :boardList = 'boardList' :addTask ='addTask' :EditTask ='EditTask' @close = 'close'/>
       </div>
       <div v-if="modalError" @click.self="modalError = !modalError" class="modal-mask grid grid-rows-1 items-center">
      <p v-text="error" v-show="error" class="p-2 mb-4 rounded-md sm:w-4/5 md:w-8/12 lg:w-1/2 text-center justify-self-center bg-red-700 text-gray-100"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { errorList, insertList } from '../Model/lists'
import listModal from './Modal/ListModal.vue'
import taskModal from './Modal/TaskModal.vue'
export default defineComponent({
  name: 'lists',
  props: ['lists', 'tasks', 'board'],
  components: {
    listModal: listModal,
    taskModal: taskModal
  },
  data: () => ({
    AddList: false,
    modal: false,
    nameList: '',
    error: '',
    edit: false,
    list: {},
    boardList: {},
    addTasks: false,
    deletedList: false,
    EditTask: false,
    addTask: true,
    task: {},
    modalError: false
  }),
  methods: {
    Add () {
      const newList = { name: this.nameList, boardID: this.$props.board._id }
      insertList(newList).then(() => {
        if (errorList.value.length > 1) {
          this.modalError = true
          this.error = errorList.value
        } else {
          this.nameList = ''
          this.AddList = false
        }
      })
    },
    editList (OneList: {}) {
      this.list = OneList
      this.deletedList = false
      this.modal = true
      this.edit = true
    },
    remove (OneList: {}) {
      this.list = OneList
      this.deletedList = true
      this.modal = true
      this.edit = true
    },
    close (close: boolean) {
      this.edit = close
      this.modal = close
    },
    AddTask (list: {}) {
      this.addTask = true
      this.EditTask = false
      this.list = list
      this.boardList = this.$props.board
      this.modal = true
      this.addTasks = true
    },
    editTask (task: {}) {
      this.addTask = false
      this.EditTask = true
      this.task = task
      this.boardList = this.$props.board
      this.modal = true
      this.addTasks = true
    }
  }
})
</script>

<style lang="scss">
.addlist-y {
  width: 1px;
  top: 10%;
  height: 80%;
  right: 50%;
}
.addlist-x {
  width: 80%;
  right: 10%;
  height: 1px;
  bottom: 50%;
}
</style>

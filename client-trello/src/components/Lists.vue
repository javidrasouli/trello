<template>
  <div>
    <div class="partion-tasks">
      <div v-for="list in lists" :key="list._id" class=" bg-indigo-700 rounded-xl p-4 m-2 min-w-48">
        <div class="flex border-b">
          <h1 v-text="list.name" class="text-white text-xl m-auto"></h1>
          <h3 class="m-auto cursor-pointer text-white mt-2">
            <i class="fa fa-edit"></i>
          </h3>
          <h3 class="m-auto cursor-pointer text-white mt-2">
            <i class="fa fa-remove"></i>
          </h3>
        </div>
        <div v-for="task in tasks" :key="task._id">
        <div v-if="list._id === task.listID" class="grid grid-rows-1 grid-cols-1">
          <div class=" bg-green-500 my-3 p-2 rounded-lg text-white">
            <h2 v-text="task.name" class="cursor-pointer"></h2>
          </div>
        </div>
        </div>
        <div class="text-gray-300 bg-gray-500 mt-2 rounded-md p-1 hover:text-black ">
          <h1>create Task</h1>
        </div>
      </div>
      <div
        class=" bg-transparent rounded-xl w-48 h-48 m-2 border-dashed border-4 border-gray-600 bg-gray-400 opacity-25 grid grid-rows-1 grid-cols-1 relative cursor-pointer"
      >
        <span
          class="border-dashed border-2 border-gray-600 absolute addlist-y z-0"
        ></span>
        <span
          class=" border-dashed border-2 border-gray-600 absolute addlist-x z-10"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BoardList, Lists } from '../Model/lists'
export default defineComponent({
  name: 'lists',
  props: ['lists', 'tasks'],
  data: () => ({
    Lists: {}
  })
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

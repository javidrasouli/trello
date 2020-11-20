<template>
  <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-2">
    <div>
      <form @submit.prevent="addToBoard()" class="flex lg:grid lg:grid-cols-1 lg:grid-rows-1 lg:w-1/2 lg:m-auto">
        <input
        v-model="personTeam"
          type="text"
          placeholder="Person"
          class=" mr-1 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700"
        />
        <select
          v-model="taskPerson"
          class=" mx-2 bg-teal-400 p-2 rounded-lg my-3 outline-none h-10 self-center"
        >
          <option disabled value="">select Task</option>
          <option value="....">....</option>
          <option v-for="task in tasks" :key="task._id" :value="task._id" v-text="task.name"></option>
        </select>
        <button
          class=" bg-gradient-to-r hover:from-teal-400 focus:outline-none outline-none hover:to-blue-500 h-10 self-center hover:text-gray-300 rounded-lg p-2 bg-transparent border border-blue-500"
        >
          Add
        </button>
      </form>
    </div>
    <div>
      <table class="border-separate border-2 border-gray-500 w-full">
        <thead>
          <tr>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">
              person
            </th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">Task</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in Teams" :key="team._id">
            <td class="border border-gray-400 px-4 py-2" v-text="team.person"></td>
            <td class="border border-gray-400 px-4 py-2" v-text="team.task" ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addTeam, Team, TeamBoard } from '../Model/lists'
export default defineComponent({
  name: 'Team',
  props: ['board', 'tasks'],
  data: () => ({
    Teams: {},
    taskPerson: '',
    personTeam: ''
  }),
  created () {
    const board = this.$props.board
    Team(board).then(() => {
      this.Teams = TeamBoard.value
    })
  },
  methods: {
    addToBoard () {
      const task = this.taskPerson
      let teamBoard
      if (task !== '....') {
        teamBoard = { person: this.personTeam, boardID: this.$props.board._id, taskID: task }
      } else {
        teamBoard = { person: this.personTeam, boardID: this.$props.board._id, task: '....', taskID: '' }
      }
      addTeam(teamBoard)
    }
  }
})
</script>

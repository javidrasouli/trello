<template>
<div>
  <div class="conteiner">
    <table class="Table-task">
  <thead class="Table-task-head">
    <th>
      <tr>username</tr>
    </th>
    <th>
      <tr>Task</tr>
    </th>
  </thead>
<tbody class="Table-task-body">
    <tr v-for="member in members" :key="member._id">
    <td class="table-item" v-text="member.username"></td>
    <span v-for="task in Tasks" :key="task._id">
      <span v-if="task.userID == member._id">
    <td v-text="task.name"></td>
    </span>
    </span>
  </tr>
</tbody>
</table>
  </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ModalM from './Modal/EditM.vue'
import { get } from '../utils/http'
import { getmembersTask, getMemberTask, Lists, membersTasks, memberTask } from '../Model/lists'
import { members } from '../Model/auth'
export default defineComponent({
  name: 'memberAdmin',
  created () {
    this.Tasks = Lists.value.task
    getmembersTask(Lists.value.task).then(() => {
      this.members = membersTasks
    })
  },
  data: () => ({
    isOpen: 0,
    OpenEdit: 0,
    OpenDel: 0,
    OpenM: 0,
    Tasks: {},
    members: {}
  }),
  methods: {
    open () {
      this.isOpen = +1
    }
  }
})
</script>
<style lang="scss">
  .username{
    cursor: pointer;
  }
  .overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>

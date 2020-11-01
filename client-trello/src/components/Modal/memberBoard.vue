<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
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
    <tr v-for="member in membersM" :key="member._id">
    <td class="table-item" v-text="member.username"></td>
    <span v-for="task in TasksM" :key="task._id">
      <span v-if="task.userID == member._id">
    <td v-text="task.name"></td>
    </span>
    </span>
  </tr>
</tbody>
</table>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { members } from '../../Model/auth'
import { getmembersTask, getMemberTask, Lists, membersTasks, memberTask } from '../../Model/lists'
export default defineComponent({
  name: 'modal',
  created () {
    this.TasksM = Lists.value.task
    getmembersTask(Lists.value.task).then(() => {
      this.membersM = membersTasks
    })
  },
  data: () => ({
    isOpen: 0,
    OpenEdit: 0,
    OpenDel: 0,
    OpenM: 0,
    TasksM: {},
    membersM: {}
  })
})
</script>
<style lang="scss">
.Table-member-body{
  & td{
    padding: 0.5rem;
  }
}
</style>

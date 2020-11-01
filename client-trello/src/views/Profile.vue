<template>
  <div>
    <nav>
      <ul class="navbar-profile">
        <li v-text="user.username"></li>
        <li @click="Board()" :class="{active: boards}">Boards</li>
        <li @click="Member()" v-if="user.role == 'admin'" :class="{active: members}">Members</li>
        <li @click="Task()" :class="{active: tasks}">Tasks</li>
      </ul>
    </nav>
    <board v-if="boards" :user = 'user'/>
    <task v-if="tasks" :user = 'user'/>
    <member v-if="members" :user = 'user'/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BoardList from '../components/Board.vue'
import TaskList from '../components/Tasks.vue'
import MemberList from '../components/memberAdmin.vue'
import { post } from '../utils/http'
import { user, users } from '../Model/auth'
import { TasksUsers } from '../Model/lists'
export default defineComponent({
  name: 'Profile',
  components: {
    board: BoardList,
    task: TaskList,
    member: MemberList
  },
  data: () => ({
    members: false,
    boards: true,
    tasks: false,
    user: {}
  }),
  created () {
    this.user = user.value
    users()
  },
  methods: {
    Board () {
      this.boards = true
      this.members = false
      this.tasks = false
    },
    Task () {
      this.boards = false
      this.members = false
      TasksUsers(user.value._id).then(() => {
        this.tasks = true
      })
    },
    Member () {
      this.boards = false
      this.members = true
      this.tasks = false
    }
  }
})
</script>
<style lang="scss">
.navbar-profile{
  background-color: rgb(52, 53, 53);
  color: #fff;
  display: flex;
  margin: 0;
  padding: 1rem;
  & li{
    list-style-type: none;
    margin: 0 auto;
    cursor: pointer;
    &:hover{
      color: rgb(0, 211, 18);
    }
    &.active{
      color: rgb(0, 211, 18);
    }
  }
}
</style>

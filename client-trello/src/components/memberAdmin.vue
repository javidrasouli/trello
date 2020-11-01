<template>
<div>
  <nav>
      <ul class="navbar-board">
        <li class="navbar-board-item" @click="addUserss = true">AddMember</li>
      </ul>
    </nav>
  <div class="conteiner">
    <table class="Table-task">
  <thead class="Table-task-head">
    <th>
      <tr>username</tr>
    </th>
    <th>
      <tr>Email</tr>
    </th>
  </thead>
<tbody class="Table-task-body">
    <tr v-for="user in users" :key="user._id">
    <td class="table-item username" @click="open(user)" v-text="user.username"></td>
    <td v-text="user.email"></td>
    <div class="overlay" v-if="isOpen" @click.self="isOpen = false">
        <modal v-if="isOpen" :userEdit = 'userEdit' @close-edit = 'closeEdit'/>
   </div>
  </tr>
</tbody>
</table>
  </div>
  <div class="overlay" v-if="addUserss" @click.self="addUserss = false">
        <add-usrs v-if="addUserss" @close-user = 'closeUser'/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ModalM from './Modal/EditM.vue'
import { get } from '../utils/http'
import { members } from '../Model/auth'
import addUser from './Modal/addUser.vue'
export default defineComponent({
  name: 'memberAdmin',
  components: {
    modal: ModalM,
    addUsrs: addUser
  },
  created () {
    this.users = members.value
  },
  data: () => ({
    addUserss: false,
    isOpen: false,
    OpenEdit: 0,
    OpenDel: 0,
    OpenM: 0,
    users: [],
    userEdit: {}
  }),
  methods: {
    open (user: {}) {
      this.userEdit = user
      this.isOpen = true
    },
    closeUser (close: boolean) {
      this.addUserss = close
      debugger
    },
    closeEdit (close: boolean) {
      this.isOpen = close
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

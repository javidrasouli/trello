<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <div>
            <form @submit.prevent = "addTaskitem()">
              <p v-show="error" v-text="error" class="err"></p>
              <div class="input-group">
              <input v-model= "Taskname"  v-atuofocus class="input" type="text" placeholder="name" name="TaskName">
            </div>
            <div class="input-group">
              <textarea v-model= "TaskDescribtion" name="TaskDescribtion"  cols="30" rows="5" placeholder="Describtion"></textarea>
            </div>
            <div class="input-group">
              <input v-model= "TaskMember" class="input" type="text" placeholder="Member" name="TaskMember">
            </div>
            <button class="edit-modal" v-show = "Taskname" >Add</button>
            </form>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { AddTask, memberTask, updateTask } from '../../Model/lists'
import { findmember, taskmember, users } from '../../Model/auth'
export default defineComponent({
  name: 'modal',
  props: ['AddTask'],
  data: () => ({
    task: {},
    member: {},
    Taskname: '',
    TaskDescribtion: '',
    TaskMember: '',
    error: ''
  }),
  created () {
    users()
  },
  methods: {
    addTaskitem () {
      findmember(this.TaskMember).then(() => {
        if (taskmember.value.length > 0) {
          const memberTask = taskmember.value
          const list = this.$props.AddTask
          const newTask = { boardID: list.boardID, listID: list._id, userID: memberTask, name: this.Taskname, description: this.TaskDescribtion }
          AddTask(newTask).then(() => {
            this.$emit('close', false)
          })
        } else {
          this.error = 'member not found'
        }
      })
    }
  }
})
</script>

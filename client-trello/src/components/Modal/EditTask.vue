<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <div v-if="user">
              <h3 v-text="task.name"></h3>
              <h5 v-text="task.description"></h5>
              <br>
              <h4 v-text="member.username"></h4>
              <div class="icon-edit">
              <h2><i class="fa fa-edit icon-edit-modal" v-show="showEdit" @click="change()"></i></h2>
              <h2><i class="fa fa-close icon-del-modal" v-show="showEdit" @click="Opendeltask = true"></i></h2>
            </div>
            </div>
            <div v-if="edituser">
            <form @submit.prevent = "editTaskitem()">
              <p v-show="err" v-text="err" class="err"></p>
              <div class="input-group">
              <input v-model= "Taskname"  v-atuofocus class="input" type="text" placeholder="name" name="TaskName">
            </div>
            <div class="input-group">
              <textarea v-model= "TaskDescribtion" name="TaskDescribtion"  cols="30" rows="5" placeholder="Describtion"></textarea>
            </div>
            <div class="input-group">
              <input v-model= "TaskMember" class="input" type="text" placeholder="Member" name="TaskMember">
            </div>
            <button class="edit-modal" v-show="Taskname">Edit</button>
            </form>
            </div>
          </div>
          <div class="overlay" v-if="Opendeltask" @click.self="Opendeltask = false">
           <deleted v-if="Opendeltask" :task = 'task' @closet = 'closet'/>
         </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { memberTask, updateTask } from '../../Model/lists'
import { findmember, taskmember, users, user } from '../../Model/auth'
import delTask from './delTask.vue'
export default defineComponent({
  name: 'modal',
  components: {
    deleted: delTask
  },
  props: ['editTask'],
  data: () => ({
    Opendeltask: false,
    edituser: false,
    user: true,
    task: {},
    member: {},
    Taskname: '',
    TaskDescribtion: '',
    TaskMember: '',
    error: '',
    showEdit: false
  }),
  created () {
    this.task = this.$props.editTask
    this.member = memberTask.value
    const person = user.value
    if (person.role === 'owner') {
      this.showEdit = true
    } else if (person.role === 'admin') {
      this.showEdit = true
    }
    users()
  },
  methods: {
    change () {
      this.edituser = !this.edituser
      this.user = !this.user
      this.Taskname = this.$props.editTask.name
      this.TaskDescribtion = this.$props.editTask.description
      this.TaskMember = memberTask.value.username
    },
    editTaskitem () {
      const oldTask = this.$props.editTask
      findmember(this.TaskMember).then(() => {
        if (taskmember.value.length > 0) {
          const memberTask = taskmember.value
          const newTask = { _id: this.$props.editTask._id, listID: oldTask.listID, userID: memberTask, name: this.Taskname, description: this.TaskDescribtion }
          updateTask(oldTask, newTask).then(() => {
            this.$emit('close-task', false)
          })
        } else {
          this.error = 'member not found'
        }
      })
    },
    closet (close: boolean) {
      this.Opendeltask = close
      this.$emit('close-task', false)
    }
  }
})
</script>

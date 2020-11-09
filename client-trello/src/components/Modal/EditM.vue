<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <div v-if="user">
              <h3 v-text="userEdit.username"></h3>
              <h4 v-text="userEdit.email"></h4>
              <div class="icon-edit">
              <h2><i class="fa fa-edit icon-edit-modal" @click="change()"></i></h2>
              <h2><i class="fa fa-close icon-del-modal" @click="deleted()"></i></h2>
            </div>
            </div>
            <div v-if="edituser">
              <form @submit.prevent="EditUser()">
                <p v-show="err" v-text="err" class="err"></p>
            <div class="input-group">
              <input v-model="Eusername"  v-atuofocus class="input" type="text" placeholder="username" name="Eusername">
            </div>
            <div class="input-group">
              <input v-model="Eemail" class="input" type="email" placeholder="Email" name="Eemail">
            </div>
            <button class="edit-modal" v-show="Eusername">Edit</button>
              </form>
            </div>
          </div>
      </div>
    </transition>
    <div class="overlay" v-if="remove" @click.self="remove = false">
        <remove v-if="remove" :member = 'member' @close-deleted = 'closedeleted'/>
   </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { editUser } from '../../Model/auth'
import delUser from './delUser.vue'
export default defineComponent({
  name: 'modal',
  components: {
    remove: delUser
  },
  props: ['userEdit'],
  data: () => ({
    remove: false,
    edituser: false,
    user: true,
    Eusername: '',
    Eemail: '',
    member: {}
  }),
  methods: {
    change () {
      const member = this.$props.userEdit
      this.Eusername = member.username
      this.Eemail = member.email
      this.edituser = !this.edituser
      this.user = !this.user
    },
    EditUser () {
      const oldMember = this.$props.userEdit
      const newMember = { _id: oldMember._id, username: this.Eusername, email: this.Eemail }
      editUser(oldMember, newMember).then(() => {
        this.$emit('close-edit', false)
      })
    },
    deleted () {
      this.member = this.$props.userEdit
      this.remove = true
    },
    closedeleted (close: boolean) {
      this.remove = close
      this.$emit('close-edit', false)
    }
  }
})
</script>

<style lang="scss">
.icon-edit{
  display: flex;
  & h2{
    margin:0 auto;
  }
  & .icon-edit-modal{
    color: rgb(0, 89, 255);
    cursor: pointer;
  }
  & .icon-del-modal{
    color: rgb(255, 0, 0);
    cursor: pointer;
  }
}
.edit-modal{
  padding: 0.5rem 1rem;
  background-color: rgb(6, 247, 247);
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  &:focus{
    outline: 0;
  }
  &:hover{
    background-color: rgb(231, 247, 6);
  }
}
</style>

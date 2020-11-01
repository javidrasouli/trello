<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
              <form @submit.prevent="addUser()">
                <p v-show="err" v-text="err" class="err"></p>
            <div class="input-group">
              <input v-model="Ausername"  v-atuofocus class="input" type="text" placeholder="username" name="Eusername">
            </div>
            <div class="input-group">
              <input v-model="Aemail" class="input" type="email" placeholder="Email" name="Eemail">
            </div>
            <div class="input-group">
              <input v-model="Apass" class="input" type="text" placeholder="password" name="pass">
            </div>
            <button class="edit-modal" v-show = "Ausername">Add</button>
              </form>
          </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ErrorCodes } from 'vue'
import { addUser, erorr, err } from '../../Model/auth'
import delUser from './delUser.vue'
export default defineComponent({
  name: 'modal',
  data: () => ({
    Ausername: '',
    Aemail: '',
    Apass: '',
    err: ''
  }),
  methods: {
    addUser () {
      const newMember = { username: this.Ausername, email: this.Aemail, pass: this.Apass }
      addUser(newMember).then(() => {
        if (erorr.value) {
          this.err = err.value
        } else {
          this.$emit('close-user', false)
        }
      })
    }
  }
})
</script>

<style lang="scss">
.modal {
  width: 400px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  color: #333;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
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

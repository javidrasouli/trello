<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <div v-if="user">
              <h3 v-text="edit.name"></h3>
              <h5 v-text="edit.description"></h5>
              <div class="icon-edit">
              <h2><i class="fa fa-edit icon-edit-modal" @click="change()"></i></h2>
              <h2><i class="fa fa-close icon-del-modal" @click="closeModal()"></i></h2>
            </div>
            </div>
            <div v-if="edituser">
            <form @submit.prevent="editBoard()">
              <p v-show="err" v-text="err" class="err"></p>
              <div class="input-group">
              <input v-model="nameBoard" v-atuofocus class="input" type="text" placeholder="name">
            </div>
            <div class="input-group">
              <textarea v-model="descriptionBoard" cols="30" rows="5" placeholder="Describtion"></textarea>
            </div>
            <button class="edit-modal" type="submit" v-show="nameBoard">Edit</button>
            </form>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateBoard, erorr, errorBoard } from '../../Model/boards'
export default defineComponent({
  name: 'modal',
  props: ['edit'],
  data: () => ({
    edituser: false,
    user: true,
    nameBoard: '',
    descriptionBoard: '',
    err: ''
  }),
  methods: {
    change (props: []) {
      this.edituser = !this.edituser
      this.user = !this.user
      this.nameBoard = this.$props.edit.name
      this.descriptionBoard = this.$props.edit.description
    },
    editBoard (props: []) {
      updateBoard(this.$props.edit, { name: this.nameBoard, description: this.descriptionBoard, _id: this.$props.edit._id })
        .then(() => {
          if (erorr.value) {
            this.err = JSON.stringify(errorBoard.value)
          }
          const close = false
          this.$emit('close-edit', close)
        })
    },
    closeModal () {
      const close = false
      this.$emit('close-edit', close)
    }
  }
})
</script>

<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <form @submit.prevent="create()">
              <p v-show="err" v-text="err" class="err"></p>
              <div class="input-group">
              <input v-model="boardName"  v-atuofocus class="input" type="text" placeholder="Name Board"  name="Cboard">
            </div>
            <div class="input-group">
              <textarea v-model="boardDescription" name="description"  cols="30" rows="5" placeholder="description"></textarea>
            </div>
            <button class="edit-modal" v-show="boardName" type="submit">create</button>
            </form>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { user } from '../../Model/auth'
import { insertBoard, erorr, errorBoard } from '../../Model/boards'
import { post } from '../../utils/http'
export default defineComponent({
  name: 'createboard',
  data: () => ({
    boardName: '',
    boardDescription: '',
    userid: {},
    err: ''
  }),
  methods: {
    create () {
      this.userid = user.value._id
      insertBoard({ name: this.boardName, description: this.boardDescription, userID: this.userid })
        .then((event) => {
          if (erorr.value) {
            this.err = errorBoard.value
          } else {
            const close = false
            this.$emit('close', close)
          }
        })
    }
  }
})
</script>

<style lang="scss">
  .input-group{
    & textarea{
      width: 100%;
      background-color: #e5e2e2af;
      border: none;
      border-radius: 5px;
      &:focus{
    background-color: #a8e0f7af;
    outline: 0;
  }
    }
  }
</style>

<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <form @submit.prevent="CreateValue()">
              <p v-show="err" v-text="err" class="err"></p>
              <div class="input-group">
              <input v-model="CList"  v-atuofocus class="input" type="text" placeholder="Name List"  name="Cboard">
            </div>
            <button class="edit-modal" v-show="CList">create</button>
            </form>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { insertList, erorr, errorList } from '../../Model/lists'
export default defineComponent({
  name: 'createlist',
  props: ['board'],
  data: () => ({
    CList: '',
    err: ''
  }),
  methods: {
    CreateValue () {
      const boardID = this.$props.board._id
      insertList({ name: this.CList, boardID: boardID })
        .then((event) => {
          if (erorr.value) {
            this.err = errorList.value
          } else {
            const close = false
            this.$emit('close-list', close)
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

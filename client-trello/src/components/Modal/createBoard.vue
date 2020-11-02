<template>
  <div>
              <p v-show="err" v-text="err" class="err"></p>
              <div class="modal-createBoard">
                <form @submit.prevent="create()">
            <span class="modal-header-createBoard"></span>
            <div class="modal-body-createBoard">
                  <input type="text" class="create-board" placeholder="name"/>
                  <textarea rows="8" class="desc-board create-board" placeholder="description"></textarea>
          </div>
            <span class="close-createBoard">&times;</span>
            <span class="ok-createBoard"><i class="fa fa-check"></i></span>
            <span class="modal-footer-createBoard"></span>
          </form>
          </div>
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
.modal-createBoard{
  width: 400px;
  margin: 0px auto;
      padding: 1rem;
      background-color: #333;
      border-radius: 5px;
      position: relative;
}
.modal-header-createBoard{
      width: 50%;
      height: 12px;
      top: -2%;
      right: 25%;
      background-color: sienna;
      border-radius: 3px;
      position: absolute;
}
.modal-footer-createBoard{
      width: 80%;
      height: 5%;
      bottom: -2%;
      right: 10%;
      background-color: sienna;
      border-radius: 3px;
      position: absolute;
}
.create-board{
      display: block;
      margin: auto;
      margin-top: 2rem;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      width: 90%;
      outline: 0;
      color: #f4f4f4;
      height: 20%;
      font-size: large;
      font-weight: 500;
}
.desc-board{
  border: none;
      font-size: larger;
      font-weight: 500;
}
.close-createBoard{
      font-size: 30px;
      font-weight: 100;
      position: absolute;
      top: -1%;
      right: 3%;
      color: #f4f4f4;
      cursor: pointer;
      &:hover{
        color: red;
      }
}
.ok-createBoard{
      font-size: 28px;
      font-weight: 100;
      position: absolute;
      bottom: 0%;
      right: 5.4%;
      color: #f4f4f4;
      cursor: pointer;
      &:hover{
        color: green;
      }
}
</style>

<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
            <div v-if="oldList">
              <div class="nameList" >
              <h3 v-text="list.name"></h3>
              <h2><i class="fa fa-edit icon-edit-list" @click="change()"></i></h2>
              </div>
            </div>
            <div v-if="edit">
            <form @submit.prevent="EditValue()">
              <p v-show="err" v-text="err" class="err"></p>
              <div class="input-group">
              <input v-model="editList"  v-atuofocus class="input" type="text" placeholder="name" name="ListName">
            </div>
            <button class="edit-modal" type="submit" v-show="editList">Edit</button>
            </form>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { updateList } from '../../Model/lists'
export default defineComponent({
  name: 'modal',
  props: ['list'],
  data: () => ({
    edit: false,
    oldList: true,
    editList: ''
  }),
  methods: {
    change () {
      this.edit = !this.edit
      this.editList = this.$props.list.name
      this.oldList = !this.oldList
    },
    EditValue () {
      const oldList = this.$props.list
      const newList = { _id: oldList._id, name: this.editList }
      updateList(oldList, newList)
    }
  }
})
</script>
<style lang="scss">
.nameList{
  display: flex;
  align-items: center;
  & h3,h2{
    margin: 0 auto;
  }
  & .icon-edit-list{
    color: rgb(0, 204, 255);
    &:hover{
      color: rgb(255, 4, 4);
      cursor: pointer;
    }
  }
}
</style>

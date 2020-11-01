<template>
  <div>
    <transition name="modal">
      <div>
          <div class="modal">
              <h3>Do you want to remove this??</h3>
              <div class="del-btn">
                  <button class="ok" @click="delBoard()">Yes</button>
                  <button class="No" @click="close()">No</button>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { deletedList } from '../../Model/lists'
export default defineComponent({
  name: 'modal',
  props: ['list'],
  methods: {
    delBoard () {
      deletedList(this.$props.list).then(() => {
        const close = false
        this.$emit('close-deleted', close)
      })
    },
    close () {
      const close = false
      this.$emit('close-deleted', close)
    }
  }
})
</script>
<style lang="scss">
.del-btn{
  display: flex;
}
.ok{
  padding: 0.5rem 1rem;
  background-color: rgb(249, 253, 11);
  border: none;
  font-weight: 500;
  border-radius: 5px;
  margin: 0 auto;
  &:hover{
    background-color: rgb(25, 255, 4);
    color: #fff;
  }
}
.No{
    padding: 0.5rem 1rem;
  background-color: rgb(253, 168, 11);
  border: none;
  font-weight: 500;
  border-radius: 5px;
  margin: 0 auto;
  &:hover{
    background-color: rgb(255, 4, 4);
    color: #fff;
  }
}
</style>

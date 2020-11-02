<template>
  <div class="conteiner">
<section  class="index-page-tasks">
        <div class="task-card-back">
          <div class="task-card-main">
            <h3>task1</h3>
            <div class="icon-task">
              <h4><i class="fa fa-envelope"></i></h4>
              <h4><i class="fa fa-envelope"></i></h4>
            </div>
          </div>
          <div class="task-card-cover"></div>
          <div class="task-card-cover2"></div>
        </div>
        <div class="task-card-back">
          <div class="task-card-main">
            <h3>task1</h3>
            <div class="icon-task">
              <h4><i class="fa fa-envelope"></i></h4>
              <h4><i class="fa fa-envelope"></i></h4>
            </div>
          </div>
          <div class="task-card-cover"></div>
          <div class="task-card-cover2"></div>
        </div>
        <div class="task-card-back">
          <div class="task-card-main">
            <h3>task1</h3>
            <div class="icon-task">
              <h4><i class="fa fa-envelope"></i></h4>
              <h4><i class="fa fa-envelope"></i></h4>
            </div>
          </div>
          <div class="task-card-cover"></div>
          <div class="task-card-cover2"></div>
        </div>
        <div class="task-card-back">
          <div class="task-card-main">
            <h3>task1</h3>
            <div class="icon-task">
              <h4><i class="fa fa-envelope"></i></h4>
              <h4><i class="fa fa-envelope"></i></h4>
            </div>
          </div>
          <div class="task-card-cover"></div>
          <div class="task-card-cover2"></div>
        </div>
        <div class="task-card-back">
          <div class="task-card-main">
            <h3>task1</h3>
            <div class="icon-task">
              <h4><i class="fa fa-envelope"></i></h4>
              <h4><i class="fa fa-envelope"></i></h4>
            </div>
          </div>
          <div class="task-card-cover"></div>
          <div class="task-card-cover2"></div>
        </div>
    </section>
<div class="overlay" v-if="isOpen" @click.self="isOpen = false">
        <modal v-if="isOpen" :editTask = 'editTask' @close-task = 'closeTask'/>
</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { taskUser, getMemberTask } from '../Model/lists'
import editTask from './Modal/EditTask.vue'
export default defineComponent({
  data: () => ({
    tasks: {},
    isOpen: false,
    editTask: {}
  }),
  components: {
    modal: editTask
  },
  created () {
    this.tasks = taskUser.value
  },
  methods: {
    Task (task: any) {
      getMemberTask({ id: task.userID }).then(() => {
        this.editTask = task
        this.isOpen = true
      })
    },
    closeTask (close: boolean) {
      this.isOpen = close
    }
  }
})
</script>
<style lang="scss">
.task-card-back{
  margin: 0.5rem;
  width: 200px;
  height: 160px;
  background-color: rgb(121, 121, 121);
  border-radius: 8px;
  position: relative;
  & .task-card-main{
    width: 90%;
    height: 80%;
    left: 5%;
    top: 8%;
    border-radius: 8px;
    background-color: #f4f4f4;
    position: absolute;
    padding: 0.5rem;
    &:hover{
      z-index: 999;
    }
    & .icon-task{
      display: flex;
      & h4{
        margin: auto;
      }
    }
  }
  & .task-card-cover{
    position: absolute;
    width: 100%;
    height: 50%;
    top: 50%;
    background-color: #333;
    border-radius: 8px;
    right: 3%;
  }
  & .task-card-cover2{
    position: absolute;
    width: 100%;
    height: 50%;
    top: 50%;
    left: 3%;
    background-color: #333;
    border-radius: 8px;
  }
}
@media screen and (min-width: 750px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 980px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1200px) {
  .index-page-tasks {
    display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>

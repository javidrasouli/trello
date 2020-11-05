<template>
  <div>
    <nav>
      <ul class="navbar-profile py-1">
        <li class="text-xl">javid</li>
          <li><i class="fa fa-plus-squares md:hidden"></i></li>
          <li><img class="navbar-logo"  src="../assets/pic/farawin-nav.png" alt="farawin"></li>
          <li><i class="fa fa-envelope md:hidden"></i></li>
        <li class="text-2xl"><i class="fa fa-sign-out hover:text-red-500 cursor-pointer"></i></li>
      </ul>
    </nav>
    <mainprofile/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import mainProfile from '../components/mainProfile.vue'
export default defineComponent({
  name: 'Profile',
  components: {
    mainprofile: mainProfile
  },
  data: () => ({
  })
})
</script>
<style lang="scss">
.navbar-profile{
  background-color: rgb(52, 53, 53);
  color: #fff;
  display: flex;
  margin: 0;
  padding:0 1rem;
  & li{
    margin:auto;
    list-style-type: none;
  .navbar-logo{
      width: 50px;
      margin: 0;
      padding: 0;
    }
}
}
</style>

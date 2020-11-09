<template>
  <div>
    <nav>
      <ul class="navbar-profile py-1 bg-orange-300 w-screen bg-opacity-75">
        <li class="text-xl cursor-pointer hover:text-gray-600">javid</li>
        <li></li>
        <li>
          <img
            class="navbar-logo"
            src="../assets/pic/farawin-nav.png"
            alt="farawin"
          />
        </li>
        <li></li>
        <li class="text-2xl">
          <i class="fa fa-sign-out hover:text-red-500 cursor-pointer"></i>
        </li>
      </ul>
      <ul class="navbar-profile mini-nav py-0 bg-gray-800 w-screen">
        <li class="cursor-pointer hover:text-green-300">Profile</li>
        <li class="cursor-pointer hover:text-green-300">Members</li>
        <li class="cursor-pointer hover:text-green-300">Tasks</li>
        <li class="cursor-pointer hover:text-green-300">Boards</li>
        <li class="cursor-pointer hover:text-green-300">Message</li>
      </ul>
    </nav>
    <div class="">
      <mainprofile />
    </div>
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
  data: () => ({})
})
</script>
<style lang="scss">
.navbar-profile {
  color: #fff;
  display: flex;
  margin: 0;
  padding: 0 1rem;
  & li {
    margin: auto;
    list-style-type: none;
    .navbar-logo {
      width: 50px;
      margin: 0;
      padding: 0;
    }
  }
}
.dropdown {
  position: relative;
}
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
@media screen and (min-width: 750px) {
  .mini-nav{
    display: none;
  }
}
</style>

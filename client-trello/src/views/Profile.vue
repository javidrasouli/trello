<template>
  <div>
    <nav>
      <ul class="navbar-profile py-1 bg-orange-300 bg-opacity-75">
        <li class="text-xl" v-text="user.username"></li>
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
          <i @click="logOut()" class="fa fa-sign-out hover:text-red-500 cursor-pointer"></i>
        </li>
      </ul>
    </nav>
    <div>
      <mainprofile  :user = 'user'/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import mainProfile from '../components/mainProfile.vue'
import { getuser, user } from '../Model/auth'
import router from '../router'
export default defineComponent({
  name: 'Profile',
  components: {
    mainprofile: mainProfile
  },
  data: () => ({
    user: {}
  }),
  async created () {
    await getuser()
    this.user = user.value
  },
  methods: {
    logOut () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshtoken')
      this.$router.push('/Login')
    }
  }
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
@media screen and (min-width: 750px) {
  .none-nav{
    display: none;
  }
}
</style>
